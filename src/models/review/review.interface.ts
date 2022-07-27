import mongoose from "mongoose"

/**
 * ReviewDetail interface
 */
export interface ReviewDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
