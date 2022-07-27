
import { Request, Response } from 'express'

import NotificationSettingService from "../services/notification-settings.service"


const createNotificationSetting = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        await NotificationSettingService.createNotificationSetting(payload).then((createNotificationSettingResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createNotificationSettingResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getNotificationSettingByUserDetailId = async (req: Request, res: Response) => {
    try {
        const notificationSettingId: any = req.params.notificationSettingId
        await NotificationSettingService.findNotificationSettingByUserDetailId(notificationSettingId).then((getNotificationSettingByUserDetailId: any) => {
            return res.status(200).send({
                status: true,
                data: getNotificationSettingByUserDetailId
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updateNotificationSettingByUserDetailId = async (req: Request, res: Response) => {

    try {
        const payload = req.body
        const notificationSettingId: any = req.params.notificationSettingId
        await NotificationSettingService.updateNotificationSettingByUserDetailId(notificationSettingId, payload).then((updateNotificationSettingByUserDetailIdResponse: any) => {
            console.log("updateNotificationSettingByUserDetailIdResponse", updateNotificationSettingByUserDetailIdResponse)
            return res.status(200).send({
                status: true,
                data: updateNotificationSettingByUserDetailIdResponse
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
    createNotificationSetting,
    getNotificationSettingByUserDetailId,
    updateNotificationSettingByUserDetailId}
