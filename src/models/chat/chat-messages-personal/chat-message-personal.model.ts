import mongoose from 'mongoose'

import { ChatMessagePersonalDocument } from "./chat-message-personal.interface"

const chatMessagePersonalSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true},
    messageContent: {type: String},
    seen: {type: mongoose.Schema.Types.Boolean, default: false}
    // file: {type: String, default: null},
    // status: {type: String, enum: ['sent', 'delivered', 'read']}
}, {
    timestamps: true, minimize: false
})

const ChatMessagePersonalModel = mongoose.model<ChatMessagePersonalDocument>("ChatMessagePersonal", chatMessagePersonalSchema, 'chatmessagespersonal')


export default { ChatMessagePersonalModel }
