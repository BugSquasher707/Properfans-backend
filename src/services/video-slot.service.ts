import { DocumentDefinition } from "mongoose"

import { VideoSlotDocument } from '../models/video-slots/video-slot.interface'
import VideoSlot from '../models/video-slots/video-slot.model'

const createVideoSlot = async (videoSlotData: DocumentDefinition<VideoSlotDocument>) => {
    try {
        const createVideoSlotResponse: any = await VideoSlot.videoSlotModel.create(videoSlotData)
        if (createVideoSlotResponse) {
            return createVideoSlotResponse
        }
        throw new Error(`Sorry some errors occurred while creating video call slot`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findVideoSlotByCreatorId = async (creatorId: DocumentDefinition<VideoSlotDocument>) => {
    try {
        const findVideoSlotByCreatorIdResponse: any = await VideoSlot.videoSlotModel.find({ creatorId })
        if (findVideoSlotByCreatorIdResponse) {
            return findVideoSlotByCreatorIdResponse
        }
        throw new Error(`Sorry some errors occurred while finding video call slot`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createVideoSlot, findVideoSlotByCreatorId}
