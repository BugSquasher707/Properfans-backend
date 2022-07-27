import mongoose from "mongoose"
import { Server, Socket } from "socket.io"

import logging from "../../configurations/logging"
import { ChatGroupDocument } from "../../models/chat/chat-groups/chat-group.interface"
import ChatGroup from "../../models/chat/chat-groups/chat-group.model"
import { ChatMessageGroupDocument } from "../../models/chat/chat-messages-group/chat-message-group.interface"
import ChatMessageGroup from "../../models/chat/chat-messages-group/chat-message-group.model"
import { ChatMessagePersonalDocument } from "../../models/chat/chat-messages-personal/chat-message-personal.interface"
import ChatMessagePersonal from "../../models/chat/chat-messages-personal/chat-message-personal.model"
import { ChatTemporarySocketDocument } from "../../models/chat/chat-temporary-socket/chat-temporary-socket.interface"
import ChatTemporarySocket from "../../models/chat/chat-temporary-socket/chat-temporary-socket.model"
import ChatGroupService from "../../services/chat/chat-group.service"

import ChatTemporarySocketService from "./chat-temporary-socket.service"

const NAMESPACE = "CHAT SOCKETS"

/** EVENTs Documentation
 *
 * ===== LEGEND =====
 * >>abc  - listening to event abc
 * efg>>  - emitting event efg
 * PM     - Personal Message
 * GM     - Group Message
 *
 * ====== FLOW ======
 * Client Connect    => >>connection -> readyForCommunication>>
 * PM                => >>openChat -> receivePersonalMessageId>> -> >>sendMessage (client1) -> receiveMessage>> (client2)
 * GM                => >>sendMessage (client1) -> receiveMessage>> (room with all online clients)
 * PM Seen           => >>openChat -> receivePersonalMessageId>> -> >>initateChatRead (client1) -> emitChatRead>> (client2)
 * GM Seen           => >>initateChatRead (client1) -> emitChatRead>> (all clients online in room)
 * Group Create      => >>initiateGroupCreate -> emitGroupCreate>> -> >>initiateGroupJoin
 * Group Update      => >>initiateGroupUpdate -> emitGroupUpdate>> -> >>initiateGroupJoin / >>initiateGroupLeave
 * Client Disconnect => >>disconnect
 * Errors            => error>>
 */
const EVENTS = {
  DEFAULT: {
    connection: "connection", // params [socket: Socket]
    disconnect: "disconnect" // params [reason: string]
  },
  CLIENT: {
    sendMessage: "sendMessage", // params [message: string, room: socketId | groupId, toGroup: Boolean]
    openChat: "openChat", // params [receiverUserId: string]
    initateChatRead: "initateChatRead", // params [fromDate: Date, toDate: Date, room: string, toGroup: boolean, receiverId: string]
    initiateGroupCreate: "initiateGroupCreate", // params [payload: object]
    initiateGroupUpdate: "initiateGroupUpdate", // params [groupId: string, payload: object]
    initiateGroupJoin: "initiateGroupJoin", // params [groupId: string]
    initiateGroupLeave: "initiateGroupLeave", // params [groupId: string]
  },
  SERVER: {
    readyForCommunication: "readyForCommunication", // params [status: boolean]
    receiveMessage: "receiveMessage", // params [message: string]
    receivePersonalMessageId: "receivePersonalMessageId", // params [socketId: string] // TODO make as a callback to openchat instead
    emitChatRead: "emitChatRead", // params [fromDate: Date, toDate: Date, userId: string]
    emitGroupCreate: "emitGroupCreate", // params [fromDate: Date, toDate: Date, userId: string]
    emitGroupUpdate: "emitGroupUpdate", // params [fromDate: Date, toDate: Date, userId: string]
    error: "error" // params: [message: string, error: Object]
  }
}

/** Primary Socket IO Function
 *
 * when user is connected, user is connected only to 1 of many servers
 * therefore, it is important to store the room and messages in MongoDB
 * also, when broadcast, we use Redis adapter
 *
 * @param   {Server}    io
 * @returns {undefined}
 */
function socket(io: Server): void {
  logging.info(NAMESPACE, `Socket enabled`)

  io.on(EVENTS.DEFAULT.connection, (socket: Socket) => {
    const userIdFromSocket: any = socket.handshake.query.userId

    if (!userIdFromSocket) {
      _emitErrorToClient(socket, "userId missing in query", socket.handshake.query)
      logging.error(NAMESPACE, `userId missing in socket connection query`)
      throw new Error("User ID must be provided along with socket connection")
    } else if (userIdFromSocket.constructor === Array) {
      _emitErrorToClient(socket, "userId must be a string not an array", socket.handshake.query)
      logging.error(NAMESPACE, `userId must be a string not an array in socket connection query`)
      throw new Error("User ID provided along with socket connection must be a string not an array")
    } else {
      _beginCommunication(socket, userIdFromSocket)
      _clientDisconnection(socket)
    }
  })
}

/** All Communication Related Event handlers post connection
 *
 * Internally used function that takes an incoming socket and the userId
 * of the user initiating the socket connection. Also registers and listens
 * to all socket event handlers except disconection.
 *
 * @param   {Socket}  socket
 * @param   {string}  userId
 * @returns {Promise}
 */
async function _beginCommunication(socket: Socket, userId: string): Promise<any> {
  // Pre Flight checks before socket communication can begin for a particular socket client
  const completeTasksBeforeReady = [
                                      _readyForCommunication(socket, userId),
                                      _joinAllUserGroupRooms(socket, userId),
                                      _handleIncomingMessageFromClient(socket, userId),
                                      _handleChatOpen(socket),
                                      _handleChatRead(socket, userId),
                                      _handleGroupCreate(socket),
                                      _handleGroupUpdate(socket),
                                      _handleGroupJoin(socket),
                                      _handleGroupLeave(socket)
                                    ]

  Promise.all(completeTasksBeforeReady)
    .then(() => {
      socket.emit(EVENTS.SERVER.readyForCommunication, true)
    })
    .catch((error) => {
      socket.emit(EVENTS.SERVER.readyForCommunication, false)
      logging.error(NAMESPACE, `Failed to setup socket for `, error)
    })
}

/** Function handling adding user to temporary table
 *
 * Internal function that takes socket and userId and adds the socketId and userId
 * to a temporary table maintaining all active socket connections and their
 * mapped ID's.
 *
 * @param   {Socket}    socket
 * @param   {string}    userId
 * @returns {undefined}
 */
async function _readyForCommunication(socket: Socket, userId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const filterQuery = {
      userId: userId
    }
    const updateQuery = {
      userId: userId,
      socketId: socket.id
    }

    // Add to temporary table - online
    // On connection save user id and socket id to temp table, update if already present
    // TODO Refractor
    ChatTemporarySocket.ChatTemporarySocketModel.findOneAndUpdate(filterQuery, updateQuery, { upsert: true }, function(error: any) {
      if (error) {
        logging.error( NAMESPACE, `socket emit error on upserting temporary socket id and user id`, error)
        return reject()
      } else {
        return resolve()
      }
    })
  })
}

/** Function handling the joining of users to all their group rooms
 *
 * Internal function to find all groups the user is part of and join
 * socket.io rooms with the same name as the groupId of the groups
 *
 * @param   {Socket}  socket
 * @param   {string}  userId
 * @returns {Promise}
 */
async function _joinAllUserGroupRooms(socket: Socket, userId: string): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    // Find all chat groups with userId that initiated the socket connection
    ChatGroup.ChatGroupModel.find(
      {
        users: {
          $elemMatch: {
            userId: new mongoose.Types.ObjectId(userId)
          }
        }
      },
      async function (error: Error, docs: any) {
        if (error) {
          logging.error(NAMESPACE, `Failed to setup socket for `, error)
        } else {
          // array of group ids as strings
          let groupRooms = docs.map((doc: any) => doc.id)
          try {
            await socket.join(groupRooms)
            return resolve()
          } catch {
            return reject()
          }
        }
      }
    )
  })
}

/** Function that handles the sending and receiving of messages
 *
 * Internal function that takes a socket as input and listens for messages
 * from the socket and emits them to either the group chats or to personal
 * chats. The toGroup boolean defines if the value for room is either a
 * personal socketId if false or a groupId if true. receiverId is same as
 * room if it is a group message or the actual receivers userId if it is a
 * personal message
 *
 * @param   {Socket}  socket
 * @param   {string}  userId
 * @returns {Promise}
 */
async function _handleIncomingMessageFromClient(socket: Socket, userId: string): Promise<any> {
  return new Promise<void>((resolve) => {
    // Listen for messages
    socket.on(EVENTS.CLIENT.sendMessage, (message: string, room: string, toGroup: boolean, receiverId: string) => {
      // Save Group or Personal Message
      if (toGroup) {
        ChatMessageGroup.ChatMessageGroupModel.create({
          senderId: userId,
          groupId: receiverId,
          messageContent: message,
          seenBy: [userId]
        })
          .then((doc) => {
            console.log(doc)
            _emitOutgoingMessageToClient(socket, room, message, true, doc)
          })
          .catch((error: Error) => {
            logging.error(NAMESPACE, `Unable to create document in ChatMessageGroup`, error)
          })
      } else {
        ChatMessagePersonal.ChatMessagePersonalModel.create({
          senderId: userId,
          receiverId: receiverId,
          messageContent: message,
          seen: false
        })
          .then((doc) => {
            _emitOutgoingMessageToClient(socket, room, message, false, doc)
          })
          .catch((error: Error) => {
            logging.error(NAMESPACE, `Unable to create document in ChatMessagePersonal`, error)
          })
      }

      return resolve()
    })
  })
}

/** Function that handles the receiving of messages
 *
 * Internal function that takes a room input, either a groupId or a temporary
 * socketId (in the case of personal messaging) and emits a message.
 *
 * @param   {Socket}                    socket
 * @param   {string}                    room
 * @param   {string}                    message
 * @param   {boolean}                   toGroup
 * @param   {ChatMessageGroupDocument}  doc
 * @return  {undefined}
 */
async function _emitOutgoingMessageToClient(
  socket: Socket,
  room: string,
  message: string,
  toGroup: boolean,
  doc: ChatMessageGroupDocument | ChatMessagePersonalDocument
) {
  if (toGroup) {
    console.log(socket.rooms.has(room))
    if (socket.rooms.has(room)) {
      socket.to(room).emit(EVENTS.SERVER.receiveMessage, message, doc)
    }
  } else {
    socket.to(room).emit(EVENTS.SERVER.receiveMessage, message, doc)
  }
}

/** Handle Events On Opening Personal Chats
 *
 * Internal function that listens for the openChat event send by the client.
 * This event is emitted when a personal chat is opened from the client.
 * On receving the event we use the attached chat recipient user Id
 * to emit the receivePersonalMessageId event back to the client along
 * with the socketId of the recipient if it exists so that the client can
 * begin sending messages
 *
 * @param   {Socket}    socket
 * @returns {undefined}
 */
async function _handleChatOpen(socket: Socket): Promise<void> {
  return new Promise((resolve) => {
    socket.on(EVENTS.CLIENT.openChat, (receiverUserId: string) => {
      // TODO refractor
      ChatTemporarySocket.ChatTemporarySocketModel.findOne({ userId: receiverUserId }, function(error: Error, doc: ChatTemporarySocketDocument) {
        if (!error) {
          socket.emit(EVENTS.SERVER.receivePersonalMessageId, doc.socketId)
        } else {
          // TODO send push notification to the user
          _emitErrorToClient(socket, "Failed to retrieve socket id of the receiver after chat was open", error)
        }
      })
      return resolve()
    })
  })
}

/** Function that handles the chat being seen
 *
 * Internal function that listens for the event that is send by client
 * when the client(user) sees a chat. The fromDate and toDate here represent
 * the exact created date of the message retrieved from the DB. All messages
 * greater than equal to fromDate and lesser than equal to toDate can be at once
 * set as seen by the user attached to the current socket. This information is then
 * emitted down to all the other online sockets in the same room or to just the
 * receiver for personal messages.
 *
 * @param   {Socket}  socket
 * @param   {string}  userId
 * @returns {Promise}
 */
async function _handleChatRead(socket: Socket, userId: string): Promise<any> {
  return new Promise<void>((resolve) => {
    // Listen for messages
    socket.on(
      EVENTS.CLIENT.initateChatRead,
      (fromDate: Date, toDate: Date, room: string, toGroup: boolean, receiverId: string) => {
        // Save Group or Personal Message
        if (toGroup) {
          ChatMessageGroup.ChatMessageGroupModel.updateMany(
            {
              groupId: new mongoose.Types.ObjectId(receiverId),
              createdAt: {
                $gte: fromDate,
                $lte: toDate
              }
            },
            {
              $addToSet: {
                seenBy: userId
              }
            }
          )
            .then(() => {
              _emitChatReadToClient(socket, room, fromDate, toDate, userId)

            })
            .catch((error: Error) => {
              logging.error(NAMESPACE, `Unable to update documents with chat seen status in ChatMessageGroup`, error)
            })
        } else {
          ChatMessagePersonal.ChatMessagePersonalModel.updateMany(
            {
              groupId: new mongoose.Types.ObjectId(receiverId),
              createdAt: {
                $gte: fromDate,
                $lt: toDate
              }
            },
            {
              seen: true
            }
          )
            .then(() => {
              _emitChatReadToClient(socket, room, fromDate, toDate, userId)
            })
            .catch((error: Error) => {
              logging.error(NAMESPACE, `Unable to update documents with chat seen status in ChatMessagePersonal`, error)
            })
        }

      // Save Group or Personal Message
      if(toGroup) {
        // TODO Refractor
        ChatMessageGroup.ChatMessageGroupModel.updateMany({
          groupId: new mongoose.Types.ObjectId(receiverId ),
          createdAt: {
            $gte: fromDate,
            $lte: toDate
          }
        }, {
          $addToSet: {
            seenBy: userId
          }
        }).then(() => {
          _emitChatReadToClient(socket, room, fromDate, toDate, userId)
          return resolve()
        }).catch((error: Error) => {
          logging.error( NAMESPACE, `Unable to update documents with chat seen status in ChatMessageGroup`, error)
        })
      } else {
        // TODO Refractor
        ChatMessagePersonal.ChatMessagePersonalModel.updateMany({
          groupId: new mongoose.Types.ObjectId(receiverId),
          createdAt: {
            $gte: fromDate,
            $lt: toDate
          }
        }, {
          seen: true
        }).then(() => {
          _emitChatReadToClient(socket, room, fromDate, toDate, userId)
          return resolve()
        }).catch((error: Error) => {
          logging.error( NAMESPACE, `Unable to update documents with chat seen status in ChatMessagePersonal`, error)
        })
      }
    })
  })
}

/** Function that handles the emitting of chat seen events
 *
 * Emit chat seen event along with the userId that saw the chat,
 * the fromDate or the date of first seen message,
 * and the toDate representing the last seen message.
 *
 * @param   {Socket}    socket
 * @param   {string}    room
 * @param   {Date}      fromDate
 * @param   {Date}      toDate
 * @param   {string}    userId
 * @return  {undefined}
 */
async function _emitChatReadToClient(socket: Socket, room: string, fromDate: Date, toDate: Date, userId: string) {
  socket.to(room).emit(EVENTS.SERVER.emitChatRead, fromDate, toDate, userId)
}

/** Handle Incoming Group Create Event
 *
 * Internal function that listens for the event that is send by client
 * when an user creates a group and looks for online sockets of users added
 * to groups then emits emitGroupCreate event to all of them
 *
 * @param   {Socket}  socket
 * @returns {Promise}
 */
 async function _handleGroupCreate(socket: Socket): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    socket.on(EVENTS.CLIENT.initiateGroupCreate, (payload: any) => {
      // Create chat group with payload
      ChatGroupService.createChatGroup(payload).then((createChatGroupResponse: any) => {
        let userIds = []
        for(let i = 0;i < payload.users.length;i++) {
          userIds.push(payload.users[i].userId)
        }

        // Find all socketIds of online users
        ChatTemporarySocketService.findChatTemporarySockets(userIds).then((findAllResponse: any) => {
          for(let i = 0;i < findAllResponse.length;i++) {
            // emit chat create event to all online sockets
            _emitGroupCreate(socket, findAllResponse[i].socketId, createChatGroupResponse)
          }
          return resolve()
        }).catch(error => {
          _emitErrorToClient(socket, "finding online sockets failed", error)
          return reject(error)
        })
      }).catch(error => {
        _emitErrorToClient(socket, "creating group failed", error)
        return reject(error)
      })
    })
  })
}

/** Emit group create event
 *
 * Emit group create event to all sockets online in the room which is same as
 * the group ID.
 *
 * @param   {Socket}            socket
 * @param   {string}            room
 * @param   {ChatGroupDocument} doc
 * @return  {undefined}
 */
async function _emitGroupCreate(socket: Socket, room: string, doc: ChatGroupDocument) {
  socket.to(room).emit(EVENTS.SERVER.emitGroupCreate, doc)
}

/** Handle Incoming Group Update Event
 *
 * Internal function that listens for the event that is send by client
 * when an user Updates a group, looks for online sockets of users added
 * to groups then emits emitGroupUpdate event to all of them
 *
 * @param   {Socket}  socket
 * @returns {Promise}
 */
 async function _handleGroupUpdate(socket: Socket): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    socket.on(EVENTS.CLIENT.initiateGroupUpdate, (groupId: string, payload: any) => {
      // update chatgroup with
      ChatGroupService.updateChatGroupById(groupId, payload).then((UpdateChatGroupResponse: any) => {

        let userIds = []
        for(let i = 0;i < UpdateChatGroupResponse.users.length;i++) {
          userIds.push(UpdateChatGroupResponse.users[i].userId)
        }
        ChatTemporarySocketService.findChatTemporarySockets(userIds).then((findAllResponse: any) => {
          for(let i = 0;i < findAllResponse.length;i++) {
            // emit chat update event to all online sockets
            _emitGroupUpdate(socket, findAllResponse[i].socketId, UpdateChatGroupResponse)
          }
          return resolve()
        }).catch(error => {
          _emitErrorToClient(socket, "finding online sockets failed", error)
          return reject(error)
        })
      }).catch(error => {
        _emitErrorToClient(socket, "updating group failed", error)
        return reject(error)
      })
    })
  })
}

/** Emit group Update event
 *
 * Emit group Update event to all sockets online in the room which is same as
 * the group ID.
 *
 * @param   {Socket}            socket
 * @param   {string}            room
 * @param   {ChatGroupDocument} doc
 * @return  {undefined}
 */
async function _emitGroupUpdate(socket: Socket, room: string, doc: ChatGroupDocument) {
  socket.to(room).emit(EVENTS.SERVER.emitGroupUpdate, doc)
}

/** Handle Incoming Group Join Event
 *
 * Internal function that listens for the event that is send by client
 * when an user joins a group.
 *
 * @param   {Socket}  socket
 * @param   {string}  groupId
 * @returns {Promise}
 */
 async function _handleGroupJoin(socket: Socket): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    socket.on(EVENTS.CLIENT.initiateGroupJoin, async (groupId: string) => {
      try {
        await socket.join(groupId)
        return resolve()
      } catch(error) {
        _emitErrorToClient(socket, "joining group failed", error)
        logging.error( NAMESPACE, `Failed to join group ${groupId}`, error)
        return reject(error)
      }
    })
  })
}

/** Handle Incoming Group Leave Event
 *
 * Internal function that listens for the event that is send by client
 * when an user leaves or is kicked from a group.
 *
 * @param   {Socket}  socket
 * @param   {string}  groupId
 * @returns {Promise}
 */
 async function _handleGroupLeave(socket: Socket): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    socket.on(EVENTS.CLIENT.initiateGroupLeave, async (groupId: string) => {
      try {
        await socket.leave(groupId)
        return resolve()
      } catch(error) {
        _emitErrorToClient(socket, "leaving group failed", error)
        logging.error( NAMESPACE, `Failed to leave group ${groupId}`, error)
        return reject(error)
      }
    })
  })
}

/** Emit Error to Client
 *
 * Internal Message to handle error messages generated during socket events.
 *
 * @param   {Socket}    socket
 * @param   {string}    errorMessage
 * @return  {undefined}
 */
async function _emitErrorToClient(socket: Socket, errorMessage: string, errorObject: any) {
  socket.emit(EVENTS.SERVER.error, errorMessage, errorObject)
}

/** Function handling client disconnection
 *
 * Internal Functions that handles the client disconnection evernts.
 * Also deletes the socketId and userId from the temporary table when
 * the client disconnects
 *
 * @param   {Socket}    socket
 * @returns {undefined}
 */
async function _clientDisconnection(socket: Socket): Promise<void> {
  socket.on(EVENTS.DEFAULT.disconnect, (reason: any) => {
    logging.info(NAMESPACE, `User disconnected because of ${reason}`)

    // Remove from temporary table - Offline
    // TODO refrator
    ChatTemporarySocket.ChatTemporarySocketModel.deleteOne({ socketId: socket.id }, function(error : Error) {
      if (error) {
        _emitErrorToClient(socket, `Failed to delete socket for ${socket.handshake.query.userId}`, error)
        logging.error(NAMESPACE, `Failed to delete socket for ${socket.handshake.query.userId}`, error)
      }
    })
  })
}

export default socket
