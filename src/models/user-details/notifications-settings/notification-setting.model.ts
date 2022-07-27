import mongoose from 'mongoose'

import { NotificationSettingDocument } from "./notification-setting.interface"

/**
 * notificationSetting for the database
 */
const notificationSettingSchema = new mongoose.Schema({
    repliesToMyComment: { type: Boolean, default: false },
    likesMyComment: { type: Boolean, default: false },
    sendsMeDirectMessage: { type: Boolean, default: false },
    followsMe: { type: Boolean, default: false },
    tagsMeInComment: { type: Boolean, default: false },
    tagsMeInPost: { type: Boolean, default: false },
    newPostFromMyFollowings: { type: Boolean, default: false },
    userDetailId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" }
}, {
    timestamps: true, minimize: false
})
notificationSettingSchema.set('toJSON', {
    virtuals: true
})

const NotificationSettingModel = mongoose.model<NotificationSettingDocument>("NotificationSetting", notificationSettingSchema, 'notification_settings')


export default { NotificationSettingModel }
