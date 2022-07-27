import mongoose, { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { ChatGroupDocument } from "../../models/chat/chat-groups/chat-group.interface"
import ChatGroup from "../../models/chat/chat-groups/chat-group.model"

const findChatGroupByChatGroupId = async (chatGroupId: string): Promise<ChatGroupDocument | null> => {
    try {
        const findChatGroupById: any = await ChatGroup.ChatGroupModel.findOne({ _id: chatGroupId })
        if (findChatGroupById) {
            return findChatGroupById
        }
        throw new Error(`Error retrieving this ChatGroup`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findChatGroupByAccountId = async (accountId: string): Promise<ChatGroupDocument | null> => {
    try {
        const findChatGroupByAccountId: any = await ChatGroup.ChatGroupModel.findOne({ accountId: new mongoose.Types.ObjectId(accountId)})
        if (findChatGroupByAccountId) {
            return findChatGroupByAccountId
        }
        throw new Error(`Error retrieving ChatGroup for this account`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findChatGroups = async (payload: FilterQuery<ChatGroupDocument>): Promise<ChatGroupDocument | null> => {
    try {
        const findChatGroups: any = await ChatGroup.ChatGroupModel.find(payload)
        if (findChatGroups) {
            return findChatGroups
        }
        throw new Error(`Error retrieving ChatGroups`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const createChatGroup = async (chatGroup: DocumentDefinition<ChatGroupDocument>) => {
    try {
        const createChatGroupResponse = await ChatGroup.ChatGroupModel.create(chatGroup)
        if (createChatGroupResponse) {
            return createChatGroupResponse
        }
        throw new Error(`Creating chatGroup failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const updateChatGroupById = async (chatGroupId: string, payload: UpdateQuery<ChatGroupDocument>): Promise<ChatGroupDocument | null> => {
    try {
        const updateChatGroupByIdResponse: any = await ChatGroup.ChatGroupModel.findByIdAndUpdate(new mongoose.Types.ObjectId(chatGroupId), payload, { upsert: false, new: true })
        if (updateChatGroupByIdResponse) {
            return updateChatGroupByIdResponse
        }
        throw new Error(`Updating chatGroup failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteChatGroupById = async (chatGroupId: string): Promise<ChatGroupDocument | null> => {
    try {
        const deleteChatGroupByIdResponse: any = await ChatGroup.ChatGroupModel.deleteOne({ _id: new mongoose.Types.ObjectId(chatGroupId) })
        if (deleteChatGroupByIdResponse) {
            return deleteChatGroupByIdResponse
        }
        throw new Error(`Deleting chatGroup failed.`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
                    findChatGroupByChatGroupId,
                    findChatGroupByAccountId,
                    findChatGroups,
                    createChatGroup,
                    updateChatGroupById,
                    deleteChatGroupById
                }
