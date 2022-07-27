
import { Request, Response } from 'express'

import PrivacySettingService from "../services/privacy-settings.service"


const createPrivacySetting = async (req: Request, res: Response) => {
    try {
        const userDetailId: any = req.params.userDetailId
        const payload = req.body
        await PrivacySettingService.createPrivacySetting(userDetailId, payload).then((createPrivacySettingResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createPrivacySettingResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getPrivacySettingByUserDetailId = async (req: Request, res: Response) => {
    try {
        const userDetailId: any = req.params.userDetailId
        await PrivacySettingService.findPrivacySettingByUserDetailId(userDetailId).then((getPrivacySettingByUserDetailId: any) => {
            return res.status(200).send({
                status: true,
                data: getPrivacySettingByUserDetailId
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updatePrivacySettingByUserDetailId = async (req: Request, res: Response) => {

    try {
        const payload = req.body
        const userDetailId: any = req.params.userDetailId
        await PrivacySettingService.updatePrivacySettingByUserDetailId(userDetailId, payload).then((updatePrivacySettingByUserDetailIdResponse: any) => {
            console.log("updatePrivacySettingByUserDetailIdResponse", updatePrivacySettingByUserDetailIdResponse)
            return res.status(200).send({
                status: true,
                data: updatePrivacySettingByUserDetailIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {
    createPrivacySetting,
    getPrivacySettingByUserDetailId,
    updatePrivacySettingByUserDetailId}
