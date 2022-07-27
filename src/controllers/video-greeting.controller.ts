import { Request, Response } from 'express'

import VideoGreetingsService from '../services/video-greeting.service'


const createvideoGreetings = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await VideoGreetingsService.createvideoGreetings(payload).then((createvideoGreetingsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createvideoGreetingsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findvideoGreetingsById = async (req: Request, res: Response) => {
    try {
        const videoGreetingsId: any = req.params.videoGreetingsId
        await VideoGreetingsService.findvideoGreetingsById(videoGreetingsId).then((findvideoGreetingsIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findvideoGreetingsIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updatevideoGreetingsById = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const videoGreetingsId: any = req.params.videoGreetingsId
        await VideoGreetingsService.updatevideoGreetingsById(videoGreetingsId, payload).then((updatevideoGreetingsByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updatevideoGreetingsByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteVideoGreetingsById = async (req: Request, res: Response) => {
    try {
        const videoGreetingsId: any = req.params.videoGreetingsId
        await VideoGreetingsService.deleteVideoGreetingsById(videoGreetingsId).then((deletevideoGreetingsByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deletevideoGreetingsByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createvideoGreetings, findvideoGreetingsById, updatevideoGreetingsById, deleteVideoGreetingsById}
