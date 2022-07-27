import mongoose from 'mongoose'

import Post from '../posts/post.model'

import { commentReportDocument } from "./comment-report.interface"

/**
 * CommentSchema for the database
 */

let commentReportSchema = new mongoose.Schema({
    comment: { type: String, default: null },
    reason: { type: String, default: null,required:true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
    commentId: { type: mongoose.Schema.Types.ObjectId , ref: Post.PostModel }
}, {
    timestamps: true, minimize: false
})
commentReportSchema.set('toJSON', {
    virtuals: true
})
const commentReportModel = mongoose.model<commentReportDocument>("commentReport", commentReportSchema, 'comment-report')

export default { commentReportModel }
