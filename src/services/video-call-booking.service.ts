import { DocumentDefinition } from "mongoose"

import { VideoCallBookingDocument } from '../models/video-call-bookings/video-call-bookings.interface'
import VideoCallBooking from '../models/video-call-bookings/video-call-bookings.model'
import VideoCallSlot from '../models/video-slots/video-slot.model'

const createVideoCallBooking = async (videoCallBookingData: DocumentDefinition<VideoCallBookingDocument> | any) => {
    try {
        const findVideoCallSlot: any = await VideoCallSlot.videoSlotModel.findOne({ _id: videoCallBookingData.videoCallId })
        if(findVideoCallSlot) {
            const createVideoCallBookingResponse: any = await VideoCallBooking.videoGreetingsModel.create(videoCallBookingData)
            if (createVideoCallBookingResponse) {
                findVideoCallSlot.bookings.push(createVideoCallBookingResponse._id)
                await VideoCallSlot.videoSlotModel.findByIdAndUpdate(findVideoCallSlot._id, findVideoCallSlot, { upsert: false, new: true })
                return createVideoCallBookingResponse
            }
            throw new Error(`Sorry some errors occurred while creating video call booking`)
        }
        throw new Error(`The slot does not exit against this slotId`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createVideoCallBooking }
