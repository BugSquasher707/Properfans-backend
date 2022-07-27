import mongoose, { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { ChatTemporarySocketDocument } from "../../models/chat/chat-temporary-socket/chat-temporary-socket.interface"
import ChatTemporarySocket from "../../models/chat/chat-temporary-socket/chat-temporary-socket.model"

const findChatTemporarySocketByUserId = async (userId: string): Promise<ChatTemporarySocketDocument | null> => {
    try {
        const findChatTemporarySocketByUserId: any = await ChatTemporarySocket.ChatTemporarySocketModel.findOne({ _id: new mongoose.Types.ObjectId(userId) })
        if (findChatTemporarySocketByUserId) {
            return findChatTemporarySocketByUserId
        }
        throw new Error(`Error retrieving this ChatTemporarySocket`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findChatTemporarySocketBySocketId = async (socketId: string): Promise<ChatTemporarySocketDocument | null> => {
    try {
        const findChatTemporarySocketBySocketId: any = await ChatTemporarySocket.ChatTemporarySocketModel.findOne({ socketId: new mongoose.Types.ObjectId(socketId)})
        if (findChatTemporarySocketBySocketId) {
            return findChatTemporarySocketBySocketId
        }
        throw new Error(`Error retrieving ChatTemporarySocket for this socket`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findChatTemporarySockets = async (payload: FilterQuery<ChatTemporarySocketDocument>): Promise<ChatTemporarySocketDocument | null> => {
    try {
        const findChatTemporarySockets: any = await ChatTemporarySocket.ChatTemporarySocketModel.find(payload)
        if (findChatTemporarySockets) {
            return findChatTemporarySockets
        }
        throw new Error(`Error retrieving ChatTemporarySockets`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const createChatTemporarySocket = async (chatTemporarySocket: DocumentDefinition<ChatTemporarySocketDocument>) => {
    try {
        const createChatTemporarySocketResponse = await ChatTemporarySocket.ChatTemporarySocketModel.create(chatTemporarySocket)
        if (createChatTemporarySocketResponse) {
            return createChatTemporarySocketResponse
        }
        throw new Error(`Creating chatTemporarySocket failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const updateChatTemporarySocketById = async (chatTemporarySocketId: string, payload: UpdateQuery<ChatTemporarySocketDocument>): Promise<ChatTemporarySocketDocument | null> => {
    try {
        const updateChatTemporarySocketByIdResponse: any = await ChatTemporarySocket.ChatTemporarySocketModel.findByIdAndUpdate(new mongoose.Types.ObjectId(chatTemporarySocketId), payload, { upsert: false, new: true })
        if (updateChatTemporarySocketByIdResponse) {
            return updateChatTemporarySocketByIdResponse
        }
        throw new Error(`Updating chatTemporarySocket failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteChatTemporarySocketById = async (chatTemporarySocketId: string): Promise<ChatTemporarySocketDocument | null> => {
    try {
        const deleteChatTemporarySocketByIdResponse: any = await ChatTemporarySocket.ChatTemporarySocketModel.deleteOne({ _id: new mongoose.Types.ObjectId(chatTemporarySocketId) })
        if (deleteChatTemporarySocketByIdResponse) {
            return deleteChatTemporarySocketByIdResponse
        }
        throw new Error(`Deleting chatTemporarySocket failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    findChatTemporarySocketByUserId,
    findChatTemporarySocketBySocketId,
    findChatTemporarySockets,
    createChatTemporarySocket,
    updateChatTemporarySocketById,
    deleteChatTemporarySocketById
}
