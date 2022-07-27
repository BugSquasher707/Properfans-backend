import { Request, Response } from 'express'

import CommentService from "../services/comment.service"
import PostService from "../services/post.service"

// const createPostProp = async (req: Request | any, res: Response) => {

//     try {
//         const postId: any = { postId: req.params.postId }

//         const payload = req.body.userId

//         const post: any = await PostService.findPostById(postId)

//         post.likes.push(payload)

//         post.count.likes = post.likes.length

//         await PostService.updatePostById(postId.postId, post).then((createPropResponse: any) => {
//             return res.status(200).send({
//                 status: true,
//                 data: createPropResponse
//             })
//         })
//     } catch (error: any) {
//         return res.status(404).send({
//             status: false,
//             message: error.message
//         })
//     }
// }

// const deletePostProp = async (req: Request | any, res: Response) => {

//     try {
//         const postId: any = { postId: req.params.postId }

//         const payload = req.body.userId

//         const post: any = await PostService.findPostById(postId)

//         post.likes.pull(payload)

//         post.count.likes = post.likes.length

//         await PostService.updatePostById(postId.postId, post).then((deletePropResponse: any) => {
//             return res.status(200).send({
//                 status: true,
//                 data: deletePropResponse
//             })
//         })
//     } catch (error: any) {
//         return res.status(404).send({
//             status: false,
//             message: error.message
//         })
//     }
// }

// const createCommentProp = async (req: Request | any, res: Response) => {

//     try {
//         const commentId: any = req.params.commentId

//         const payload = req.body.userId

//         const comment = await CommentService.findCommentById(commentId)

//         comment.props.push(payload)

//         comment.propCount = comment.props.length

//         await CommentService.updateCommentById(commentId, comment).then((createPropResponse: any) => {
//             return res.status(200).send({
//                 status: true,
//                 data: createPropResponse
//             })
//         })
//     } catch (error: any) {
//         return res.status(404).send({
//             status: false,
//             message: error.message
//         })
//     }
// }

// const deleteCommentProp = async (req: Request | any, res: Response) => {

//     try {
//         const commentId: any = req.params.commentId

//         const payload = req.body.userId

//         const comment = await CommentService.findCommentById(commentId)

//         comment.props.pull(payload)

//         comment.propCount = comment.props.length

//         await CommentService.updateCommentById(commentId, comment).then((createPropResponse: any) => {
//             return res.status(200).send({
//                 status: true,
//                 data: createPropResponse
//             })
//         })
//     } catch (error: any) {
//         return res.status(404).send({
//             status: false,
//             message: error.message
//         })
//     }
// }

const reactPost = async (req: Request | any, res: Response) => {

    try {
        const postId: any = { postId: req.params.postId }
        const reaction: any = req.params.reaction
        const payload = req.body
        const userId = payload.userId
        const post: any = await PostService.findPostById(postId)

        if (reaction === "add") {
            post.likes.push(userId)
            post.count.likes = post.likes.length
        }
        else if (reaction === "remove") {
            post.likes.pull(userId)
            post.count.likes = post.likes.length
        }

        await PostService.updatePostById(postId.postId, post).then((updatePostByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updatePostByIdResponse
            })
        })

    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const reactComment = async (req: Request | any, res: Response) => {

    try {
        const commentId: any = req.params.commentId
        const reaction: any = req.params.reaction
        const payload = req.body
        const userId = payload.userId
        const comment = await CommentService.findCommentById(commentId)

        if (reaction === "add") {
            comment.props.push(userId)
            comment.propCount = comment.props.length
        }
        else if (reaction === "remove") {
            comment.props.pull(userId)
            comment.propCount = comment.props.length
        }

        await CommentService.updateCommentById(commentId, comment).then((updateCommentByIdResponse: any) => {
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
export = { reactPost, reactComment }
