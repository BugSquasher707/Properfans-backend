import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { NotificationSettingDocument } from "../models/user-details/notifications-settings/notification-setting.interface"
import NotificationSetting from "../models/user-details/notifications-settings/notification-setting.model"

const createNotificationSetting = async (userDetailIdInp: DocumentDefinition<NotificationSettingDocument>) => {
    try {
        const createNotificationSettingResponse = await NotificationSetting.NotificationSettingModel.create({userDetailId : userDetailIdInp})
        if (createNotificationSettingResponse) {
            return createNotificationSettingResponse
        }
        throw new Error(`Sorry some errors occurred while createNotificationSettingResponse`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findNotificationSettingByUserDetailId = async (query: FilterQuery<NotificationSettingDocument>): Promise<NotificationSettingDocument | null> => {
    try {
        const findNotificationSettingByUserDetailIdResponse: any = await NotificationSetting.NotificationSettingModel.findOne({ id: query })
        if (findNotificationSettingByUserDetailIdResponse) {
            return findNotificationSettingByUserDetailIdResponse
        }
        throw new Error(`findNotificationSettingByUserDetailIdResponse details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateNotificationSettingByUserDetailId = async (notificationSettingId: string, payload: UpdateQuery<NotificationSettingDocument>): Promise<NotificationSettingDocument | null> => {
    try {
        const updateNotificationSettingByUserDetailIdResponse: any = await NotificationSetting.NotificationSettingModel.findByIdAndUpdate(notificationSettingId, payload, { upsert: false, new: true })
        if (updateNotificationSettingByUserDetailIdResponse) {
            return updateNotificationSettingByUserDetailIdResponse
        }
        throw new Error(`updateNotificationSettingByUserDetailIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}


export default {
    createNotificationSetting,
    findNotificationSettingByUserDetailId,
    updateNotificationSettingByUserDetailId}
