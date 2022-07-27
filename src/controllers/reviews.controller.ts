import { Request, Response } from 'express'

import ReviewService from '../services/reviews.service'

const createReviewsById = async (req: Request | any, res: Response) => {
    try {
        const greetingId = req.params.greetingId
        const payload = { body: req.body, greetingId}

        await ReviewService.createReview(payload).then((createReviewResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createReviewResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteReviewById = async (req: Request | any, res: Response) => {

    try {
        const reviewId: any = req.params.reviewId
        const greetingId: any = req.params.greetingId
        const payload = { reviewId, greetingId }
        await ReviewService.deleteReview(payload).then((deleteReviewByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteReviewByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findReviewById = async (req: Request, res: Response) => {
    try {
        const greetingId: any = req.params.greetingId
        await ReviewService.findGreetingReviewById(greetingId).then((findvideoGreetingIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findvideoGreetingIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createReviewsById, deleteReviewById, findReviewById}
