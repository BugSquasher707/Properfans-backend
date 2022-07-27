import mongoose from 'mongoose'

import Brand from "../brands/brand.model"
import userDetailModel from "../user-details/user-detail.model"

import { PostDocument } from "./post.interface"

/**
 * PostSchema for the database
 */

const postSchema = new mongoose.Schema({
    access: { type: String, required: false },
    tier: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 },
    tierId:  { type: mongoose.Schema.Types.ObjectId, ref: "BrandTier" },
    urls: [{type:String,default: "placeholder.png"}],
    type: { type: String },
    tips:{ type: Number, default: 0 },
    message: { type: String,required:true },
    text: [{ type: Object,required:true }],
    count: {
        comments: { type: Number ,default: 0},
        likes:  { type: Number,default: 0}
    },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ],
    likes: [ { type: mongoose.Schema.Types.ObjectId, ref: userDetailModel.UserDetailModel } ],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: Brand.BrandModel },
    date: {type: Date, default: Date.now()},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: userDetailModel.UserDetailModel },
    reports: [ { type: mongoose.Schema.Types.ObjectId, ref:'post-report' } ],
}, {
    timestamps: true, minimize: false
})
postSchema.set('toJSON', {
    virtuals: true
})

postSchema.pre("save", async function () {
  this.text = JSON.parse(this.message).blocks
})
const PostModel = mongoose.model<PostDocument>("Post", postSchema, 'posts')

export default { PostModel }
