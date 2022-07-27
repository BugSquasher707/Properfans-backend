
import mongoose from 'mongoose'

import { FollowerDocument } from "./follower.interface"

/**
 * FollowerSchema for the database
 */
const followerSchema = new mongoose.Schema({

    club: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },

}, {
    timestamps: true, minimize: false
})
followerSchema.set('toJSON', {
    virtuals: true
})

const FollowerModel = mongoose.model<FollowerDocument>("Follower", followerSchema, 'followers')


export default { FollowerModel }
