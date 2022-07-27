
import mongoose from 'mongoose'


import { BrandDocument } from "./brand.interface"

/**
 * brandSchema for the database
 */
const brandSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    featured:{type:Boolean,default:false},
    avatar: { type: String, default: null },
    banner: { type: String, default: null },
    handle: { type: String, unique: true, required: true },
    biography: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
    fanCount: { type: Number, default: 0 },
    followers: [ { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" } ],
    bannedPhrases: { type: String },
    chatGuidelines: { type: String },
    tiers: [ { type: mongoose.Schema.Types.ObjectId, ref: "BrandTier" } ],
    posts:[{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    verified: { type: Boolean, required: false, default: false }
}, {
    timestamps: true, minimize: false
})

brandSchema.set('toJSON', {
    virtuals: true
})
const BrandModel = mongoose.model<BrandDocument>("Brand", brandSchema, 'brands')

export default { BrandModel }
