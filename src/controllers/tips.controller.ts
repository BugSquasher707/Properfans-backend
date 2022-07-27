import { Request, Response } from 'express'

import TipsService from '../services/tips.service'


const createTip = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await TipsService.createTip(payload).then((createTipResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createTipResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findTipById = async (req: Request, res: Response) => {
    try {
        const postId: any = req.params.postId
        await TipsService.findTipById(postId).then((findTipByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findTipByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default { createTip, findTipById }
