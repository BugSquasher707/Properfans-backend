import mongoose from 'mongoose'

import { VideoGreetingOrdersDocument } from "./video-greeting-order.interface"

/**
 * videoGreetingsOrderSchema for the database
 */
const videoGreetingOrdersSchema = new mongoose.Schema({
    greetingPackageId:  {type: mongoose.Schema.Types.ObjectId , ref: "GreetingPackage", required: true},
    fanId: {type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true},
    giftedId: {type: String, required: false },
    category: {type: String, required: true},
    desiredPronoun: {type: String},
    requestedMessage: {type: String},
    file: {type: String, default: null},
    privacy: {type: Boolean},
    phoneNumber: {type: Number, min: 0},
    countryCode: {type: String},
    greetingDetails: {type: String},
    videoGreetingLink: {type: String, default: null},
    status: {type: String, enum: ['approved', 'pending', 'rejected', 'done']}
}, {
    timestamps: true, minimize: false
})
videoGreetingOrdersSchema.set('toJSON', {
    virtuals: true
})
const videoGreetingOrdersModel = mongoose.model<VideoGreetingOrdersDocument>("VideoGreetingOrder", videoGreetingOrdersSchema, 'video_greeting_orders')


export default { videoGreetingOrdersModel }
