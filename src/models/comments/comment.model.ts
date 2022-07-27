import mongoose from 'mongoose'

import Post from '../posts/post.model'
import userDetailModel from "../user-details/user-detail.model"

import { CommentDocument } from "./comment.interface"

/**
 * CommentSchema for the database
 */

let CommentSchema = new mongoose.Schema({
    avatar: { type: String, default: null },
    userName: { type: String, default: null },
    handle: { type: String, default: null },
    comment: { type: String, required: true },
    verified: { type: Boolean,default:true,required: true },
    props: [ { type: mongoose.Schema.Types.ObjectId, ref: userDetailModel.UserDetailModel } ],
    propCount: { type: Number, default : 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
    childId : [ { type: mongoose.Schema.Types.ObjectId , ref: "Comment" } ],
    replyCount: { type: Number, default: 0 },
    postId: { type: mongoose.Schema.Types.ObjectId , ref: Post.PostModel },
    reports: [ { type: mongoose.Schema.Types.ObjectId, ref:'comment-report' } ],
}, {
    timestamps: true, minimize: false
})
CommentSchema.set('toJSON', {
    virtuals: true
})
function autoPopulateSubs(this: any, next:any) {

  this.populate('childId')
  next()
}

CommentSchema.
  pre('find', autoPopulateSubs).
  pre('findOne', autoPopulateSubs)
const CommentModel = mongoose.model<CommentDocument>("Comment", CommentSchema, 'comments')

export default { CommentModel }
