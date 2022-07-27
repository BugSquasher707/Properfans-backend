import { Request, Response } from 'express'

import VideoCallBookingService from '../services/video-call-booking.service'

const createVideoCallBooking = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await VideoCallBookingService.createVideoCallBooking(payload).then((createVideoCallBookingResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createVideoCallBookingResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createVideoCallBooking }
