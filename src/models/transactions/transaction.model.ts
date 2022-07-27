import mongoose from 'mongoose'

import { TransactionDocument } from "./transaction.interface"

/**
 * transactionSchema for the database
 */

const transactionSchema = new mongoose.Schema({
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail', required: true },
   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail', required: true },
   type: { type: String, enum:["buy", "convert", "tip"], required: true},
   amount: { type: Number, min: [0, 'Amount must be greater of equal than 0'], required: true},

}, {
    timestamps: true, minimize: false
})
transactionSchema.set('toJSON', {
    virtuals: true
})

const TransactionModel = mongoose.model<TransactionDocument>("Transaction", transactionSchema, 'transactions')

export default { TransactionModel }
