import mongoose from 'mongoose'

import { CreatorDetailDocument } from "./creator-detail.interface"

/**
 * CreatorDetailSchema for the database
 */
const creatorDetailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail' },
    brandCatagory: [ { type: String, default: null, required: false } ],
    contentCatagory: [ { type: String, default: null, required: false } ],
    acceptPostTips: { type: Boolean, default: false, required: false },
    videoGreetings: { type: Boolean, default: false, required: false },
}, {
    timestamps: true, minimize: false
})
creatorDetailSchema.set('toJSON', {
    virtuals: true
})
const CreatorDetailModel = mongoose.model<CreatorDetailDocument>("CreatorDetail", creatorDetailSchema, 'creator_details')


export default { CreatorDetailModel }
