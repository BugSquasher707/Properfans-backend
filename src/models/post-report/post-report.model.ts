import mongoose from 'mongoose'

import Post from '../posts/post.model'

import { postReportDocument } from "./post-report.interface"

/**
 * CommentSchema for the database
 */

let postReportSchema = new mongoose.Schema({
    comment: { type: String, default: null },
    reason: { type: String, default: null,required:true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
    postId: { type: mongoose.Schema.Types.ObjectId , ref: Post.PostModel }
}, {
    timestamps: true, minimize: false
})
postReportSchema.set('toJSON', {
    virtuals: true
})
const postReportModel = mongoose.model<postReportDocument>("postReport", postReportSchema, 'post-report')

export default { postReportModel }
