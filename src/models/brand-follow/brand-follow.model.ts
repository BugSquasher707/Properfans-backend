import mongoose from 'mongoose'

import Brand from '../brands/brand.model'
import User from '../user-details/user-detail.model'

import IBrandFollow from './brand-follow.interface'

const brandFollowSchema = new mongoose.Schema({
    club: { type: mongoose.Schema.Types.ObjectId, ref: Brand.BrandModel, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User.UserDetailModel, required: true },
},
{
    timestamps: true,
    minimize: false
})

brandFollowSchema.set('toJSON', {
    virtuals: true
})

const BrandFollowModel = mongoose.model<IBrandFollow>("BrandFollow", brandFollowSchema)

export default BrandFollowModel
