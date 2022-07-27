import mongoose from 'mongoose'

import { HashTagsDocument } from "./hash-tags.interface"

/**
 * HashTagsSchema for the database
 */

let hashTagsSchema = new mongoose.Schema({
    numberOfPosts: { type: Number, default: 0 }
}, {
    timestamps: true, minimize: false
})

hashTagsSchema.set('toJSON', {
    virtuals: true
})

const hashTagsModel = mongoose.model<HashTagsDocument>("hashTags", hashTagsSchema, 'hash-tags')

export default { hashTagsModel }
