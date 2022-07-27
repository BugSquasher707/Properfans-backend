import mongoose from 'mongoose'

import Brand from "../brands/brand.model"
import userDetailModel from "../user-details/user-detail.model"

import { BrandTierDocument } from "./brand-tiers.interface"

/**
 * brandSchema for the database
 */
const brandTierSchema = new mongoose.Schema({
    tierName: { type: String, required: true },
    tierLevel: { type: Number, enum: [0 , 1, 2, 3, 4], default: 0 },
    price: { type: Number, required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: Brand.BrandModel },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: userDetailModel.UserDetailModel }],
}, {
    timestamps: true, minimize: false
})
brandTierSchema.set('toJSON', {
    virtuals: true
})

const BrandTierModel = mongoose.model<BrandTierDocument>("BrandTier", brandTierSchema, 'brandTiers')

export default { BrandTierModel }
