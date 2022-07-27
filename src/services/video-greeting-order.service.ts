import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import GreetingPackage from '../models/greeting-packages/greeting-package.model'
import { VideoGreetingOrdersDocument } from '../models/video-greetings-order/video-greeting-order.interface'
import VideoGreetingOrder from '../models/video-greetings-order/video-greeting-order.model'
import VideoGreeting from '../models/video-greetings/video-greeting.model'

const createVideoGreetingOrders = async (videoGreetingOrderDate: DocumentDefinition<VideoGreetingOrdersDocument>) => {
    try {
        const createVideoGreetingOrdersResponse: any = await VideoGreetingOrder.videoGreetingOrdersModel.create(videoGreetingOrderDate)
        if (createVideoGreetingOrdersResponse) {
            let findGreetingPackage: any = await GreetingPackage.GreetingPackageModel.findOne({ _id: createVideoGreetingOrdersResponse.greetingPackageId })
            findGreetingPackage.videoGreetingOrders.push(createVideoGreetingOrdersResponse._id)
            await GreetingPackage.GreetingPackageModel.findByIdAndUpdate(createVideoGreetingOrdersResponse.greetingPackageId, findGreetingPackage)
            return createVideoGreetingOrdersResponse
        }
        throw new Error(`Sorry some errors occurred while creating video greeting orders`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findVideoGreetingOrdersByUserId = async (query: FilterQuery<VideoGreetingOrdersDocument>): Promise<VideoGreetingOrdersDocument | null> => {
    try {
        const findVideoGreetingOrdersByUserId: any = await VideoGreetingOrder.videoGreetingOrdersModel.find({ fanId: query })
        if (findVideoGreetingOrdersByUserId) {
            return findVideoGreetingOrdersByUserId
        }
        throw new Error(`Sorry some errors occurred while finding video greeting orders`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findVideoGreetingOrdersByCreatorId = async (query: FilterQuery<VideoGreetingOrdersDocument>): Promise<VideoGreetingOrdersDocument | null> => {
    try {

        let videoGreetingOrders: any = []

        const findVideoGreetingByCreatorId: any = await VideoGreeting.videoGreetingsModel.find({ creatorId: query })
        .populate({
            path: "greetingPackages",
            populate: {
                path: "videoGreetingOrders",
            }
        })

        if (findVideoGreetingByCreatorId) {
            findVideoGreetingByCreatorId.forEach((item: any) => {
                if(item.greetingPackages.length > 0) {
                    item.greetingPackages.forEach((element: any) => {
                        if(element.videoGreetingOrders.length > 0) {
                            videoGreetingOrders.push(...element.videoGreetingOrders)
                        }
                    })
                }
            })
            return videoGreetingOrders
        }
        throw new Error(`Sorry some errors occurred while finding video greeting orders`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findVideoGreetingOrdersByDate = async (query: FilterQuery<VideoGreetingOrdersDocument>): Promise<VideoGreetingOrdersDocument | null> => {
    try {

        let videoGreetingOrders: any = []

        const findVideoGreetingByCreatorId: any = await VideoGreeting.videoGreetingsModel.find({ creatorId: query.creatorId })
        .populate({
            path: "greetingPackages",
            populate: {
                path: "videoGreetingOrders",
            }
        })

        if (findVideoGreetingByCreatorId) {
            findVideoGreetingByCreatorId.forEach((item: any) => {
                if(item.greetingPackages.length > 0) {
                    item.greetingPackages.forEach((element: any) => {
                        if(element.videoGreetingOrders.length > 0) {
                            element.videoGreetingOrders.forEach((obj: any) => {
                                if(new Date(obj.createdAt).toJSON().slice(0, 10) === query.date ) {
                                    videoGreetingOrders.push(obj)
                                }
                            })
                        }
                    })
                }
            })

            return videoGreetingOrders
        }
        throw new Error(`Sorry some errors occurred while finding video greeting orders`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateVideoGreetingOrdersById = async (videoGreetingOrdersId: string, payload: UpdateQuery<VideoGreetingOrdersDocument>): Promise<VideoGreetingOrdersDocument | any> => {
    try {
        const updateVideoGreetingOrdersById: any = await VideoGreetingOrder.videoGreetingOrdersModel.findByIdAndUpdate(videoGreetingOrdersId, payload, { upsert: false, new: true })

        if (updateVideoGreetingOrdersById) {
            return updateVideoGreetingOrdersById
        }
        throw new Error(`Sorry some errors occurred while updating video greeting orders`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {createVideoGreetingOrders, findVideoGreetingOrdersByUserId, findVideoGreetingOrdersByCreatorId, updateVideoGreetingOrdersById, findVideoGreetingOrdersByDate}
