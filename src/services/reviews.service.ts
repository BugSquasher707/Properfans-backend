import { DocumentDefinition, FilterQuery } from "mongoose"

import { ReviewDocument } from '../models/review/review.interface'
import Review from '../models/review/review.model'
import { VideoGreetingsDocument } from '../models/video-greetings/video-greeting.interface'
import VideoGreetings from '../models/video-greetings/video-greeting.model'

const createReview = async (reviewDate: DocumentDefinition<ReviewDocument| any>) => {
    try {
        const findVideoGreeting: any = await VideoGreetings.videoGreetingsModel.findOne({ _id: reviewDate.greetingId })

        if (findVideoGreeting) {
            const createReviewResponse :any = await Review.reviewModel.create(reviewDate.body)
            if(createReviewResponse) {
                findVideoGreeting.reviews.push(createReviewResponse._id)
                 await VideoGreetings.videoGreetingsModel.findByIdAndUpdate(findVideoGreeting._id, findVideoGreeting, { upsert: false, new: true })
                return createReviewResponse
            }
        }
        throw new Error(`Sorry some errors occurred while creating a review`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteReview = async (reviewDate: DocumentDefinition<ReviewDocument> | any) => {
    try {
        const findVideoGreeting: any = await VideoGreetings.videoGreetingsModel.findOne({ _id: reviewDate.greetingId })

        if (findVideoGreeting) {
            const deleteReviewResponse :any = await Review.reviewModel.deleteOne({ _id: reviewDate.reviewId })
            if(deleteReviewResponse) {
                findVideoGreeting.reviews.pull(reviewDate.reviewId)
                 await VideoGreetings.videoGreetingsModel.findByIdAndUpdate(findVideoGreeting._id, findVideoGreeting, { upsert: false, new: true })
                return deleteReviewResponse
            }
        }
        throw new Error(`Sorry some errors occurred while deleting review`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findGreetingReviewById = async (query: FilterQuery<VideoGreetingsDocument>): Promise<VideoGreetingsDocument | null> => {
    try {
        const findGreetingReviewById: any = await VideoGreetings.videoGreetingsModel.findOne({ _id: query }).populate([{
            path: 'reviews'
        }])
        if (findGreetingReviewById) {
            return findGreetingReviewById
        }
        throw new Error(`findGreetingReviewById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export default {createReview, deleteReview, findGreetingReviewById }
