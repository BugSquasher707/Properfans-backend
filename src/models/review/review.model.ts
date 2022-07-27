import mongoose from 'mongoose'

import { ReviewDocument } from "./review.interface"

/**
 * ReviewSchema for the database
 */
const ReviewSchema = new mongoose.Schema({
    userId:  [{type: mongoose.Schema.Types.ObjectId , ref: "UserDetail", required: true}],
    reviews: {type: String, default: null, required: true}
}, {
    timestamps: true, minimize: false
})
ReviewSchema.set('toJSON', {
    virtuals: true
})
const reviewModel = mongoose.model<ReviewDocument>("Review", ReviewSchema, 'reviews')


export default { reviewModel }
