
import { Request, Response } from 'express'

import ChatGroupService from "../../services/chat/chat-group.service"


const getChatGroupByChatGroupId = async (req: Request, res: Response) => {
    try {

        const chatGroupId: string = req.params.chatGroupId
        await ChatGroupService.findChatGroupByChatGroupId(chatGroupId).then((findChatGroupByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findChatGroupByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const getChatGroupByAccountId = async (req: Request, res: Response) => {
    try {
        const accountId: string = req.params.accountId
        await ChatGroupService.findChatGroupByAccountId(accountId).then((findChatGroupByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findChatGroupByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const getChatGroups = async (req: Request, res: Response) => {
    try {
        const payload = req.query
        await ChatGroupService.findChatGroups(payload).then((findChatGroupByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findChatGroupByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const createChatGroup = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        await ChatGroupService.createChatGroup(payload).then((createChatGroupResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createChatGroupResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateChatGroupById = async (req: Request, res: Response) => {

    try {
        const payload = req.body
        const chatGroupId: any = req.params.chatGroupId
        await ChatGroupService.updateChatGroupById(chatGroupId, payload).then((updateChatGroupByIdResponse: any) => {
            console.log("updateChatGroupByIdResponse", updateChatGroupByIdResponse)
            return res.status(200).send({
                status: true,
                data: updateChatGroupByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const deleteChatGroupById = async (req: Request, res: Response) => {
    try {
        const chatGroupId: any = req.params.chatGroupId
        await ChatGroupService.deleteChatGroupById(chatGroupId).then((deleteChatGroupByIdResponse: any) => {
            console.log("deleteChatGroupByIdResponse", deleteChatGroupByIdResponse)
            return res.status(200).send({
                status: true,
                data: deleteChatGroupByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}


export default {
                    getChatGroupByChatGroupId, getChatGroupByAccountId, getChatGroups,
                    createChatGroup,
                    updateChatGroupById,
                    deleteChatGroupById
                }
