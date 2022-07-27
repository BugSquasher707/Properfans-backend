import mongoose from "mongoose"

/**
 * VideoCallDetail interface
 */

export interface VideoSlotDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
