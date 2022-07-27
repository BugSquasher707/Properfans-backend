import mongoose from 'mongoose'

import TipsDocument from './tips.interface'

const tipsSchema = new mongoose.Schema({
    coins: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    type: {
        type: Number,
        required: false
    },
    tier: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail'
    },
    postId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    brandId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
}, {
    timestamps: true
})
tipsSchema.set('toJSON', {
    virtuals: true
})

const TipsModel = mongoose.model<TipsDocument>("Tips", tipsSchema)

export default { TipsModel }
