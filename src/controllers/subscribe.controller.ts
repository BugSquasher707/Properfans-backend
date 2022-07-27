import { Request, Response } from 'express'

import subscribe from "../services/subscribe.service"

const createSubscribe = async (req: Request | any, res: Response) => {

    try {
        const userId: any = req.params.userId
        await subscribe.createSubscribe({userId,tierId:req.body.tierId}).then((createSubscribeResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createSubscribeResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}


export { createSubscribe}
