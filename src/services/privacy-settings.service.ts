import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { PrivacySettingDocument } from "../models/user-details/privacy-settings/privacy-setting.interface"
import PrivacySetting from "../models/user-details/privacy-settings/privacy-setting.model"

const createPrivacySetting = async (userDetaialId: string, userDetailIdInp: DocumentDefinition<PrivacySettingDocument>) => {
    try {
        (userDetailIdInp as any).userDetailId = userDetaialId
        const createPrivacySettingResponse = await PrivacySetting.PrivacySettingModel.create(userDetailIdInp)
        if (createPrivacySettingResponse) {
            return createPrivacySettingResponse
        }
        throw new Error(`Sorry some errors occurred while createPrivacySettingResponse`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findPrivacySettingByUserDetailId = async (query: FilterQuery<PrivacySettingDocument>): Promise<PrivacySettingDocument | null> => {
    try {
        const findPrivacySettingByUserDetailIdResponse: any = await PrivacySetting.PrivacySettingModel.findOne({ id: query })
        if (findPrivacySettingByUserDetailIdResponse) {
            return findPrivacySettingByUserDetailIdResponse
        }
        throw new Error(`findPrivacySettingByUserDetailIdResponse details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updatePrivacySettingByUserDetailId = async (privacySettingId: string, payload: UpdateQuery<PrivacySettingDocument>): Promise<PrivacySettingDocument | null> => {
    try {
        const updatePrivacySettingByUserDetailIdResponse: any = await PrivacySetting.PrivacySettingModel.findByIdAndUpdate(privacySettingId, payload, { upsert: false, new: true })
        if (updatePrivacySettingByUserDetailIdResponse) {
            return updatePrivacySettingByUserDetailIdResponse
        }
        throw new Error(`updatePrivacySettingByUserDetailIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}


export default {
    createPrivacySetting,
    findPrivacySettingByUserDetailId,
    updatePrivacySettingByUserDetailId}
