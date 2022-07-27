import mongoose from 'mongoose'

import { VideoGreetingsDocument } from "./video-greeting.interface"

/**
 * videoGreetingsSchema for the database
 */
const videoGreetingsSchema = new mongoose.Schema({
    creatorId:  {type: mongoose.Schema.Types.ObjectId , ref: "UserDetail"},
    categories: [{type: String}],
    amount: {type: Number, min: 0 },
    reviews: [{type: mongoose.Schema.Types.ObjectId , ref: "Review"}],
    rating: {type: Number, min: 0},
    greetingPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GreetingPackage', default: null }]
}, {
    timestamps: true, minimize: false
})
videoGreetingsSchema.set('toJSON', {
    virtuals: true
})

const videoGreetingsModel = mongoose.model<VideoGreetingsDocument>("VideoGreeting", videoGreetingsSchema, 'video_greetings')


export default { videoGreetingsModel }
