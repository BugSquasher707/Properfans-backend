import { Request, Response } from 'express'

import VideoGreetingOrdersService from '../services/video-greeting-order.service'
import MediaUploader from '../utilities/mediaUploader'

const createVideoGreetingOrders = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await VideoGreetingOrdersService.createVideoGreetingOrders(payload).then((createVideoGreetingOrdersResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createVideoGreetingOrdersResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findVideoGreetingOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userId
        await VideoGreetingOrdersService.findVideoGreetingOrdersByUserId(userId).then((findVideoGreetingOrdersByUserIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findVideoGreetingOrdersByUserIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const findVideoGreetingOrdersByCreatorId = async (req: Request, res: Response) => {
    try {
        const creatorId: any = req.params.creatorId
        await VideoGreetingOrdersService.findVideoGreetingOrdersByCreatorId(creatorId).then((findVideoGreetingOrdersByCreatorIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findVideoGreetingOrdersByCreatorIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findVideoGreetingOrdersByDate = async (req: Request, res: Response) => {
    try {
        const creatorId: any = req.params.creatorId
        const date: any = req.params.date
        const payload = { creatorId, date }

        await VideoGreetingOrdersService.findVideoGreetingOrdersByDate(payload).then((findVideoGreetingOrdersByCreatorIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findVideoGreetingOrdersByCreatorIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateVideoGreetingOrdersById = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const videoGreetingOrdersId: any = req.params.videoGreetingOrdersId
        await VideoGreetingOrdersService.updateVideoGreetingOrdersById(videoGreetingOrdersId, payload).then((updateVideoGreetingOrdersByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateVideoGreetingOrdersByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deliveryVideoGreetingOrder = async (req: Request | any, res: Response) => {
try {
    if (req.file) {
      const videoGreetingOrdersId: any = req.params.videoGreetingOrdersId
      const result: any = await MediaUploader.UploadMediaToAWS(req.file)
      const media = result.Location
      const payload = { videoGreetingLink: media }

      console.log(videoGreetingOrdersId)

      await VideoGreetingOrdersService.updateVideoGreetingOrdersById(videoGreetingOrdersId, payload).then(
        (deliveryVideoGreetingOrderResponse: any) => {
          return res.status(200).send({
            status: true,
            data: deliveryVideoGreetingOrderResponse,
          })
        }
      )
    }
    else {
      return res.status(404).send({
        status: false,
        error: "Please upload attachment and must be less than 100 MB",
      })
    }
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

export default {createVideoGreetingOrders, findVideoGreetingOrdersByUserId, findVideoGreetingOrdersByCreatorId, findVideoGreetingOrdersByDate, updateVideoGreetingOrdersById, deliveryVideoGreetingOrder}
