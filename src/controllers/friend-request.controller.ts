import { Request, Response } from 'express'

import RequestService from '../services/friend-request.service'


const createRequest = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await RequestService.createRequest(payload).then((createRequestResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createRequestResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}


const getMyRequestById = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userDetailId
        await RequestService.findMyRequestById(userId).then((findMyRequestByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findMyRequestByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const getSentRequestById = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userDetailId
        await RequestService.findSentRequestById(userId).then((findSentRequestByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findSentRequestByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const getMyFriends = async (req: Request | any, res: Response) => {

    try {
        const userId: any = req.params.userDetailId
        await RequestService.findMyFriends(userId).then((getMyFriends: any) => {
            return res.status(200).send({
                status: true,
                data: getMyFriends
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const acceptRequestById = async (req: Request, res: Response) => {

    try {

        const requestId: any = req.params.requestId
        await RequestService.acceptRequestById(requestId).then((acceptRequestByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: acceptRequestByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const declineRequestById = async (req: Request, res: Response) => {
    try {

        const requestId: any = req.params.requestId
        await RequestService.declineRequestById(requestId).then((declineRequestByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: declineRequestByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const cancelRequestById = async (req: Request, res: Response) => {
    try {

        const requestId: any = req.params.requestId
        await RequestService.cancelRequestById(requestId).then((cancelRequestByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: cancelRequestByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const removeFriendById = async (req: Request, res: Response) => {
    try {
        const userDetailId: any = req.params.userDetailId
        const friendId: any = req.params.friendId
        const payload: any = { userDetailId,friendId }

        await RequestService.removeFriendById(payload).then((removeFriendByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: removeFriendByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const areWeFriendById = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userDetailId
        const friendId: any = req.body.friendId
        const payload: any = { userId, friendId }

        await RequestService.areWeFriendById(payload).then((areWeFriendByIdResponse: any) => {
            return res.status(200).send({
                status: areWeFriendByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const friendsCommunityById = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userDetailId
        const userName: any = req.query.userName
        const payload: any = { userId, userName }

        await RequestService.friendsCommunityById(payload).then((friendsCommunityByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: friendsCommunityByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createRequest, getMyRequestById, getSentRequestById, getMyFriends, acceptRequestById, declineRequestById, removeFriendById, areWeFriendById, friendsCommunityById, cancelRequestById}
