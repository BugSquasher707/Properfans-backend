import mongoose from 'mongoose'

import IBrandSubscription from './brand-subscription.interface'

const brandSubscriptionSchema = new mongoose.Schema<IBrandSubscription>({
    brandId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    brandTierId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrandTier'
    },
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail'
    }
}, {
    timestamps: true, minimize: false
})
brandSubscriptionSchema.set('toJSON', {
    virtuals: true
})
brandSubscriptionSchema.index({brandId: 1, userId: 1})

const BrandSubscriptionModel = mongoose.model<IBrandSubscription>("BrandSubscription", brandSubscriptionSchema)

export default BrandSubscriptionModel
