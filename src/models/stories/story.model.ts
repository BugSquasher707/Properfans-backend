import mongoose from 'mongoose'

import Brand from "../brands/brand.model"

import { StoryDocument } from "./story.interface"

/**
 * PostSchema for the database
 */

const storySchema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: Brand.BrandModel },
    avatar: { type: String, default: null },
    handle: { type: String, default: null },
    new: { type: Boolean, default: true },
    stories:[{
        type: new mongoose.Schema(
         {
             url:{type : String},
             type:{type : String}
        },
         { timestamps: true }
        )
    }],
    userName: { type: String, default: null },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user_details' },
}, {
    timestamps: true, minimize: false
})
storySchema.set('toJSON', {
    virtuals: true
})

const StoryModel = mongoose.model<StoryDocument>("Story", storySchema, 'stories')

export default { StoryModel }
