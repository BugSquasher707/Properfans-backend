import mongoose from 'mongoose'

import { ProperMeetProfileDocument } from "./proper-meet-profile.interface"

/**
 * GreetingPackageSchema for the database
 */

const ProperMeetProfileSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    avatar: { type: String, default: null },
    banner: { type: String, default: null },
    verified: { type: Boolean, default: false },
    handle: { type: String, required: true, unique: true },
    professional: { type: Boolean, default: false },
    type: { type: Number, required: true, min: 0, default: 0 },
    priceFrom: { type: Number, required: true, default: 0,min: 0 },
    priceTo: { type: Number, required: true, default: 0,min: 0 },
    audioCalls: { type: Boolean, default: false },
    videoCalls: { type: Boolean, default: false },
    videoGreetings: { type: Boolean, default: false },
    country: { type: String, required: true }
}, {
    timestamps: true, minimize: false
})

ProperMeetProfileSchema.set('toJSON', {
    virtuals: true
})
const ProperMeetProfileModel = mongoose.model<ProperMeetProfileDocument>("ProperMeetProfile", ProperMeetProfileSchema, 'proper_meet_Profile')

export default { ProperMeetProfileModel }
