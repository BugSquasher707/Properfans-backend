import { Request, Response } from 'express'

import CommentService from '../services/comment.service'

const createComment = async (req: Request | any, res: Response) => {
    try {
        // const media = req.file?.filename ? req.file?.filename : "";
        const payload = { ...req.body }

        await CommentService.createComment(payload).then((createCommentResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createCommentResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getCommentById = async (req: Request, res: Response) => {
    try {
        const commentId: any = req.params.commentId
        await CommentService.findCommentById(commentId).then((findCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCommentByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}
const findCommentsByPostId = async (req: any , res: Response) => {
    try {
        const postId: any = req.params.postId
        const pageNo: any = req.query.pageNo ? Number(req.query.pageNo) - 1 : 0
        const limit: any = req.query.limit ? Number(req.query.limit) : 10
        await CommentService.findCommentsByPostId({postId,pageNo,limit}).then((findCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCommentByIdResponse.data,
                totalPages: Math.round(findCommentByIdResponse.count / limit) === 0 ? 1 : Math.round(findCommentByIdResponse.count / limit)
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateCommentById = async (req: Request | any, res: Response) => {

    try {
        const media = req.file?.filename ? req.file?.filename : ""
        const payload = { ...req.body, media }
        const commentId: any = req.params.commentId
        await CommentService.updateCommentById(commentId, payload).then((updateCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateCommentByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteCommentById = async (req: Request, res: Response) => {
    try {
        const commentId: any = req.params.commentId
        await CommentService.deleteCommentById(commentId).then((deleteCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteCommentByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createComment, getCommentById, updateCommentById, deleteCommentById,findCommentsByPostId}
