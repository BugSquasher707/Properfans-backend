import mongoose from "mongoose"

/**
 * VideoCallDetail interface
 */

export interface BlogDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
