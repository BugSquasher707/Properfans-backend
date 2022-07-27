import mongoose from "mongoose"

/**
 * VideoCallDetail interface
 */

export interface SupportedOriginDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
