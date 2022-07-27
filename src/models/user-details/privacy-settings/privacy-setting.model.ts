import mongoose from 'mongoose'

import { PrivacySettingDocument } from "./privacy-setting.interface"

/**
 * privacySetting for the database
 */
const privacySettingSchema = new mongoose.Schema({
    privateProfile: { type: String, default: "everyone" },
    directMessages: { type: String, default: "everyone" },
    tagging: { type: String, default: "just_followings" },
    userDetailId: { type: Number }
}, {
    timestamps: true, minimize: false
})
privacySettingSchema.set('toJSON', {
    virtuals: true
})

const PrivacySettingModel = mongoose.model<PrivacySettingDocument>("PrivacySetting", privacySettingSchema, 'privacy_settings')


export default { PrivacySettingModel }
