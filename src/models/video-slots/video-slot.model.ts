import mongoose from 'mongoose'

import { VideoSlotDocument } from "./video-slot.interface"

/**
 * videoSlotSchema for the database
 */

const videoSlotSchema = new mongoose.Schema({
    creatorId:  { type: mongoose.Schema.Types.ObjectId , ref: "UserDetail" },
    participantsLimits: { type: Number, min: 1, max: 20, default: 1 },
    amount: { type: Number, min: 0 },
    availableDate: { type: Date },
    slotStart: { type: Date },
    slotEnd: { type: Date },
    commercialFee: { type: Number, min: 0 },
    replayFee: { type: Number, min: 0 },
    rating: { type: Number, min: 0 },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "VideoCallBooking" }]
}, {
    timestamps: true, minimize: false
})
videoSlotSchema.set('toJSON', {
    virtuals: true
})

const videoSlotModel = mongoose.model<VideoSlotDocument>("VideoSlot", videoSlotSchema, 'video_slots')

export default { videoSlotModel }
