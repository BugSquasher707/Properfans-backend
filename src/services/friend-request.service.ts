import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { FriendRequestDocument } from "../models/friend-requests/friend-request.interface"
import FriendRequest from "../models/friend-requests/friend-request.model"
import UserDetail from "../models/user-details/user-detail.model"

const createRequest = async (requestDate: DocumentDefinition<FriendRequestDocument | any> | any) => {
  try {
    const createRequestResponse = await FriendRequest.friendRequestModel.create(requestDate)
    if (createRequestResponse) {
      return createRequestResponse
    }
    throw new Error(`Sorry some errors occurred while sending Request`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const findMyRequestById = async (query: FilterQuery<FriendRequestDocument>): Promise<FriendRequestDocument | null> => {
  try {
    const findMyRequestById: any = await FriendRequest.friendRequestModel
      .find({ receiver: query, status: "pending" })
      .populate([{ path: "sender" }, { path: "receiver" }])
    if (findMyRequestById) {
      return findMyRequestById
    }
    throw new Error(`findMyRequestById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findSentRequestById = async (
  query: FilterQuery<FriendRequestDocument>
): Promise<FriendRequestDocument | null> => {
  try {
    const findSentRequestById: any = await FriendRequest.friendRequestModel
      .find({ sender: query, status: "pending" })
      .populate([{ path: "sender" }, { path: "receiver" }])
    if (findSentRequestById) {
      return findSentRequestById
    }
    throw new Error(`findSentRequestById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findMyFriends = async (query: FilterQuery<FriendRequestDocument>): Promise<FriendRequestDocument | null> => {
  try {
    let user: any = await UserDetail.UserDetailModel.findOne({ _id: query }, "friendList").populate("friendList")
    if (user) {
      return user.friendList
    }
    throw new Error(`findSentRequestById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const acceptRequestById = async (
  requestId: UpdateQuery<FriendRequestDocument>
): Promise<FriendRequestDocument | null> => {
  try {
    const acceptRequestByIdResponse: any = await FriendRequest.friendRequestModel.findByIdAndUpdate(
      requestId,
      { status: "approved" },
      { upsert: false, new: true }
    )
    let receiver: any = await UserDetail.UserDetailModel.findOne({
      _id: acceptRequestByIdResponse.receiver
    })
    receiver.friendList.push(acceptRequestByIdResponse.sender)
    receiver.save()
    let sender: any = await UserDetail.UserDetailModel.findOne({
      _id: acceptRequestByIdResponse.sender
    })
    sender.friendList.push(acceptRequestByIdResponse.receiver)
    sender.save()
    if (acceptRequestByIdResponse) {
      return acceptRequestByIdResponse
    }
    throw new Error(`acceptRequestByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const declineRequestById = async (
  requestId: UpdateQuery<FriendRequestDocument>
): Promise<FriendRequestDocument | null> => {
  try {
    const declineRequestByIdResponse: any = await FriendRequest.friendRequestModel.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { upsert: false, new: true }
    )
    if (declineRequestByIdResponse) {
      return declineRequestByIdResponse
    }
    throw new Error(`declineRequestByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const cancelRequestById = async (
  requestId: UpdateQuery<FriendRequestDocument>
): Promise<FriendRequestDocument | null> => {
  try {
    const cancelRequestByIdResponse: any = await FriendRequest.friendRequestModel.findByIdAndUpdate(
      requestId,
      { status: "cancel" },
      { upsert: false, new: true }
    )
    if (cancelRequestByIdResponse) {
      return cancelRequestByIdResponse
    }
    throw new Error(`cancelRequestByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const removeFriendById = async (query: string | any): Promise<FriendRequestDocument | any> => {
  try {
    const acceptRequestByIdResponse: any = await FriendRequest.friendRequestModel.findOne({
      $and: [
        { $or: [{ sender: query.userDetailId }, { receiver: query.userDetailId }] },
        { $or: [{ sender: query.friendId }, { receiver: query.friendId }] }
      ]
    })
    console.log(acceptRequestByIdResponse)
    //  return 333
    let receiver: any = await UserDetail.UserDetailModel.findOne({
      _id: acceptRequestByIdResponse.receiver
    })

    receiver.friendList.pull(acceptRequestByIdResponse.sender)
    receiver.save()
    let sender: any = await UserDetail.UserDetailModel.findOne({
      _id: acceptRequestByIdResponse.sender
    })
    sender.friendList.pull(acceptRequestByIdResponse.receiver)
    sender.save()

    acceptRequestByIdResponse.remove()

    if (acceptRequestByIdResponse) {
      return acceptRequestByIdResponse
    }

    // const user1: any = await FriendRequest.friendRequestModel.findOne({ $and: [{ sender: query.userId }, {receiver: query.friendId}] });
    // const user2: any = await FriendRequest.friendRequestModel.findOne({ $and: [{ sender: query.friendId }, {receiver: query.userId}] });
    // if (user1) {
    //     const deleteFriend: any = await FriendRequest.friendRequestModel.deleteOne({_id: user1._id})
    //     return deleteFriend
    // }
    // else{
    //     const deleteFriend: any = await FriendRequest.friendRequestModel.deleteOne({_id: user2._id})
    //     return deleteFriend
    // }

    throw new Error(`deleteFriendByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const areWeFriendById = async (query: string | any): Promise<FriendRequestDocument | any> => {
  try {
    const user: any = await FriendRequest.friendRequestModel.findOne({
      $and: [{ sender: query.friendId }, { receiver: query.userId }],
      status: "approved"
    })

    return user ? true : false
  } catch (error: any) {
    throw new Error(error)
  }
}

const friendsCommunityById = async (query: string | any): Promise<FriendRequestDocument | any> => {
  try {
    const userName = query.userName
    const regex = new RegExp(userName, "i")
    const friendsCommunityByIdResponse: any = await FriendRequest.friendRequestModel
      .find({ $or: [{ sender: query.userId }, { receiver: query.userId }], status: "approved" })
      .populate([
        {
          path: "receiver",
          match: {
            username: { $regex: regex }
          }
        },
        {
          path: "sender",
          match: {
            username: { $regex: regex }
          }
        }
      ])

    if (friendsCommunityByIdResponse) {
      return friendsCommunityByIdResponse
    }

    throw new Error(`areWeFriend not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  createRequest,
  findMyRequestById,
  findSentRequestById,
  findMyFriends,
  acceptRequestById,
  declineRequestById,
  removeFriendById,
  areWeFriendById,
  friendsCommunityById,
  cancelRequestById
}
