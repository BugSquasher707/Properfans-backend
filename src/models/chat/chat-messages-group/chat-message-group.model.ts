import mongoose from 'mongoose'

import { ChatMessageGroupDocument } from "./chat-message-group.interface"

const chatMessageGroupSchema = new mongoose.Schema({
    groupId:  {type: mongoose.Schema.Types.ObjectId , ref: "ChatGroup", required: true},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true},
    messageContent: {type: String},
    seenBy: [{type: mongoose.Schema.Types.ObjectId, ref:"UserDetail"}]
    // file: {type: String, default: null},
    // status: {type: String, enum: ['sent', 'delivered', 'read']}
}, {
    timestamps: true, minimize: false
})

const ChatMessageGroupModel = mongoose.model<ChatMessageGroupDocument>("ChatMessageGroup", chatMessageGroupSchema, 'chatmessagesgroup')


export default { ChatMessageGroupModel }
