import mongoose from "mongoose"

import { SupportedOriginDocument } from "./supported-origin-document.interface"

const supportedOriginSchema = new mongoose.Schema({
    url: {
        type: String
    },
},{
    timestamps: true
})


supportedOriginSchema.set('toJSON', {
    virtuals: true
})

const supportedOrigin = mongoose.model<SupportedOriginDocument>("supportedOrigin", supportedOriginSchema, 'supportedOrigin')

export default { supportedOrigin }
