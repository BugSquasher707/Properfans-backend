import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { CommentDocument } from '../models/comments/comment.interface'
import Comment from '../models/comments/comment.model'
import Post from '../models/posts/post.model'

const createComment = async (commentDate: DocumentDefinition<CommentDocument | any> | any) => {
    try {
        const createCommentResponse = await Comment.CommentModel.create(commentDate)

        const findPost: any = await Post.PostModel.findOne({ _id: commentDate.postId })

        if(findPost) {
            findPost.comments.push(createCommentResponse._id)
            findPost.count.comments = findPost.comments.length

            await Post.PostModel.findByIdAndUpdate(findPost._id, findPost, { upsert: false, new: true })
        }
        else{
            throw new Error(`Sorry some errors occurred while creating Comment`)
        }

        if(commentDate.parentId) {
            const newComment: any = await Comment.CommentModel.findOne({_id : commentDate.parentId})

            newComment?.childId.push(createCommentResponse._id)
            await newComment.save()
            return newComment
        }
        else{
            if (createCommentResponse) {
                return createCommentResponse
            }
            throw new Error(`Sorry some errors occurred while creating Comment`)
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

const findCommentById = async (query: FilterQuery<CommentDocument>): Promise<CommentDocument | any> => {
    try {
        const findCommentById: any = await Comment.CommentModel.findOne({ _id: query })

            if (findCommentById) {
                return findCommentById
            }
            throw new Error(`findCommentById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const findCommentsByPostId = async (query: FilterQuery<CommentDocument>): Promise<CommentDocument | any> => {
    try {
        console.log(query)

        const findCommentsByPostId: any = await Comment.CommentModel.find({ postId: query.postId }).sort({createdAt:1}).limit(query.limit).skip(query.pageNo * query.limit)
        const count: any = await Comment.CommentModel.find({ postId: query.postId }).count()

            if (findCommentsByPostId) {
                return {data:findCommentsByPostId,count}
            }
            throw new Error(`findCommentsByPostId details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateCommentById = async (commentId: string, payload: UpdateQuery<CommentDocument>): Promise<CommentDocument | null> => {
    try {
        const updateCommentByIdResponse: any = await Comment.CommentModel.findByIdAndUpdate(commentId, payload, { upsert: false, new: true })
        if (updateCommentByIdResponse) {
            return updateCommentByIdResponse
        }
        throw new Error(`updateCommentByIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteCommentById = async (commentId: string): Promise<CommentDocument | any> => {
    try {
        const findComment: any = await Comment.CommentModel.findOne({ _id: commentId })

        const findPost: any = await Post.PostModel.findOne({ _id: findComment?.postId })

        const deleteCommentByIdResponse: any = await Comment.CommentModel.deleteOne({ _id: commentId })

        if(findPost) {
            findPost.comments.pull(commentId)
            findPost.count.comments = findPost.comments.length

            await Post.PostModel.findByIdAndUpdate(findPost._id, findPost, { upsert: false, new: true })

            if (deleteCommentByIdResponse) {
                return deleteCommentByIdResponse
            }
            else{
                throw new Error(`deleteCommentByIdResponse not found`)
            }
        }
        else{
            throw new Error(`Sorry some errors occurred while deleting Comment`)
        }



    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createComment, findCommentById, updateCommentById, deleteCommentById,findCommentsByPostId }
