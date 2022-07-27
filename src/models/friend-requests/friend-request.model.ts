
import mongoose from 'mongoose'

import { FriendRequestDocument } from "./friend-request.interface"

/**
 * friendRequestSchema for the database
 */
const friendRequestSchema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId , ref : 'UserDetail' },
    sender: { type: mongoose.Schema.Types.ObjectId , ref : 'UserDetail' },
    status : { type : String, enum : ['pending', 'approved', 'rejected', 'cancel'] , default : 'pending'}

}, {
    timestamps: true, minimize: false
})
friendRequestSchema.set('toJSON', {
    virtuals: true
})
const friendRequestModel = mongoose.model<FriendRequestDocument>("FriendRequest", friendRequestSchema, 'friendRequest')


export default { friendRequestModel }
