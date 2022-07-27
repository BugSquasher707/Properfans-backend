import mongoose from "mongoose"

/**
 * VideoGreetingOrderDetail interface
 */
export interface VideoGreetingOrdersDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
