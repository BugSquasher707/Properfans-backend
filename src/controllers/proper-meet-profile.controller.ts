import { Request, Response } from 'express'

import ProperMeetProfileService from '../services/proper-meet-profile.service'
import MediaUploader from '../utilities/mediaUploader'

const createProperMeetProfile = async (req: Request | any, res: Response) => {
    try {
        let payload = req.body

        await ProperMeetProfileService.createProperMeetProfile(payload).then((createProperMeetProfileResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createProperMeetProfileResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getAllProperMeetProfile = async (req: Request, res: Response) => {
    try {
        await ProperMeetProfileService.findAllProperMeetProfile().then((getAllProperMeetProfileResponse: any) => {
            return res.status(200).send({
                status: true,
                data: getAllProperMeetProfileResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getProperMeetProfileByHandle = async (req: Request, res: Response) => {
    try {
        const handle = req.params.handle

        await ProperMeetProfileService.findProperMeetProfileByHandle(handle).then((getProperMeetProfileResponse: any) => {
            return res.status(200).send({
                status: true,
                data: getProperMeetProfileResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateProperMeetProfileAvatarByHandle = async (req: Request, res: Response) => {
    try {
        const handle = req.params.handle
        let payload = {}

        if (req.file) {
            const result: any = await MediaUploader.UploadMediaToAWS(req.file)
            const media = result.Location
            payload = { avatar: media }
        }

        await ProperMeetProfileService.updateProperMeetProfileMediaByHandle(handle, payload).then((updateProperMeetProfileMediaResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateProperMeetProfileMediaResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateProperMeetProfileBannerByHandle = async (req: Request, res: Response) => {
    try {
        const handle = req.params.handle
        let payload = {}

        if (req.file) {
            const result: any = await MediaUploader.UploadMediaToAWS(req.file)
            const media = result.Location
            payload = { banner: media }
        }

        await ProperMeetProfileService.updateProperMeetProfileMediaByHandle(handle, payload).then((updateProperMeetProfileMediaResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateProperMeetProfileMediaResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createProperMeetProfile, getAllProperMeetProfile, getProperMeetProfileByHandle, updateProperMeetProfileAvatarByHandle, updateProperMeetProfileBannerByHandle }
