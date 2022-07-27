import { Request, Response } from 'express'

import VideoSlotService from '../services/video-slot.service'

const createVideoSlot = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await VideoSlotService.createVideoSlot(payload).then((createVideoSlotResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createVideoSlotResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findVideoSlotByCreatorId = async (req: Request | any, res: Response) => {
    try {
        const creatorId = req.params.creatorId
        await VideoSlotService.findVideoSlotByCreatorId(creatorId).then((findVideoSlotResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findVideoSlotResponse
            })
        })
    }
    catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createVideoSlot, findVideoSlotByCreatorId }
