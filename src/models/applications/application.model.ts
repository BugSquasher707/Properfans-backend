import mongoose, { Schema } from 'mongoose'

import { ApplicationDocument } from "../applications/application.interface"

/**
 * ApplicationSchema for the database
 */
const applicationSchema = new mongoose.Schema({
    accountId: { type: Schema.Types.ObjectId, required: false },
    applicationType: { type: String, required: true },
    heardAboutUsFrom: { type: String },
    plannedUseOfPlatform: [{ type: String }],
    currentMonetization: [{ type: String }],
    monthlyEarnings: { type: String },
    whyJoinUs: { type: String },
    status: { type: String, required: false, default: false },
    statusReason: { type: String }
}, {
    timestamps: true, minimize: false
})
applicationSchema.set('toJSON', {
    virtuals: true
})

const ApplicationModel = mongoose.model<ApplicationDocument>("Application", applicationSchema, 'applications')


export default { ApplicationModel }
