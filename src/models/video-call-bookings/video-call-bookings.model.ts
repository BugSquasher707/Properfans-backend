import mongoose from 'mongoose'

import { VideoCallBookingDocument } from "./video-call-bookings.interface"

/**
 * videoCallBookingSchema for the database
 */
const videoCallBookingSchema = new mongoose.Schema({
    videoCallId: { type: mongoose.Schema.Types.ObjectId , ref: "VideoCall" },
    fanId: { type: mongoose.Schema.Types.ObjectId , ref: "UserDetail", default: null },
    giftedId: { type: mongoose.Schema.Types.ObjectId , ref: "UserDetail", default:null },
    callingPlatform: { type: String },
    privacy: { type: Boolean },
    phoneNumber: { type: Number, min: 0 },
    countryCode: { type: String }
}, {
    timestamps: true, minimize: false
})

const videoGreetingsModel = mongoose.model<VideoCallBookingDocument>("VideoCallBooking", videoCallBookingSchema, 'video_call_bookings')

export default { videoGreetingsModel }
