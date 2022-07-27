import mongoose from 'mongoose'

import { ChatTemporarySocketDocument } from "./chat-temporary-socket.interface"

const chatTemporarySocketSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true, unique: true},
    socketId: {type: String, required: true, unique: true},
}, {
    timestamps: true, minimize: false
})

chatTemporarySocketSchema.index({userId: 1, socketId: 1}, {unique:true})

const ChatTemporarySocketModel = mongoose.model<ChatTemporarySocketDocument>("ChatTemporarySocket", chatTemporarySocketSchema, 'chattemporarysockets')


export default { ChatTemporarySocketModel }
