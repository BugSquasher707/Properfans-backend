import mongoose from 'mongoose'

import IProperWallet from './properWallet.interface'

const properWalletSchema = new mongoose.Schema<IProperWallet>({
    coins: {
        type: Number,
        min: 0,
        default: 0
    },
    properfansId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail'
    },
}, {
    timestamps: true
})
properWalletSchema.set('toJSON', {
    virtuals: true
})

const ProperWalletModel = mongoose.model<IProperWallet>("ProperWallet", properWalletSchema)

export default ProperWalletModel
