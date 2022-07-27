import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { VideoGreetingsDocument } from '../models/video-greetings/video-greeting.interface'
import VideoGreetings from '../models/video-greetings/video-greeting.model'

const createvideoGreetings = async (videoGreetingsDate: DocumentDefinition<VideoGreetingsDocument>) => {
    try {
        const createvideoGreetingsResponse = await VideoGreetings.videoGreetingsModel.create(videoGreetingsDate)
        if (createvideoGreetingsResponse) {
            return createvideoGreetingsResponse
        }
        throw new Error(`Sorry some errors occurred while creating video greetings`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findvideoGreetingsById = async (query: FilterQuery<VideoGreetingsDocument>): Promise<VideoGreetingsDocument | null> => {
    try {
        const findvideoGreetingsById: any = await VideoGreetings.videoGreetingsModel.findOne({ _id: query }).populate({
            path : "creatorId"
        })
        if (findvideoGreetingsById) {
            return findvideoGreetingsById
        }
        throw new Error(`Sorry some errors occurred while finding video greetings`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updatevideoGreetingsById = async (videoGreetingsId: string, payload: UpdateQuery<VideoGreetingsDocument>): Promise<VideoGreetingsDocument | null> => {
    try {
        const updatevideoGreetingsByIdResponse: any = await VideoGreetings.videoGreetingsModel.findByIdAndUpdate(videoGreetingsId, payload, { upsert: false, new: true })
        if (updatevideoGreetingsByIdResponse) {
            return updatevideoGreetingsByIdResponse
        }
        throw new Error(`Sorry some errors occurred while updating video greetings`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteVideoGreetingsById = async (videoGreetingsId: string): Promise<VideoGreetingsDocument | null> => {
    try {
        const deleteVideoGreetingsByIdResponse: any = await VideoGreetings.videoGreetingsModel.deleteOne({ _id: videoGreetingsId })
        if (deleteVideoGreetingsByIdResponse) {
            return deleteVideoGreetingsByIdResponse
        }
        throw new Error(`Sorry some errors occurred while deleting video greetings`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {createvideoGreetings, findvideoGreetingsById, updatevideoGreetingsById, deleteVideoGreetingsById}
