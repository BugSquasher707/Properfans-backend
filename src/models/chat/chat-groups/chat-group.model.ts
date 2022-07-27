import mongoose from 'mongoose'

import { ChatGroupDocument } from "./chat-group.interface"

const chatGroupSchema = new mongoose.Schema({
    users: [
        {
            userType : { type: String, enum: ['admin', 'member'], default: 'member', required: true},
            userId: { type: mongoose.Schema.Types.ObjectId, ref:"UserDetail", required: true},
            addedOn:  { type: Date, default: Date.now, required: true }
        }
    ],
    name: { type: String, required: true },
    description: { type: String, required: false }
    // ToDo group image
}, {
    timestamps: true, minimize: false
})

const ChatGroupModel = mongoose.model<ChatGroupDocument>("ChatGroup", chatGroupSchema, 'chatgroups')


export default { ChatGroupModel }
