import mongoose from 'mongoose'

import { GreetingPackageDocument } from "./greeting-package.interface"

/**
 * GreetingPackageSchema for the database
 */

const greetingPackageSchema = new mongoose.Schema({
    greetingId: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoGreetings', required: true },
    deliveryTime: { type: Number, required: true, min: 0 },
    additionalAmount: { type: Number, required: true, min: 0 },
    commercialFee: { type: Number, required: true, min: 0 },
    videoGreetingOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "VideoGreetingOrder", default: null }]
}, {
    timestamps: true, minimize: false
})
greetingPackageSchema.set('toJSON', {
    virtuals: true
})
const GreetingPackageModel = mongoose.model<GreetingPackageDocument>("GreetingPackage", greetingPackageSchema, 'greeting_packages')

export default { GreetingPackageModel }
