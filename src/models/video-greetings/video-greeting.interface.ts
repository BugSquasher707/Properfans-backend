import mongoose from "mongoose"

/**
 * VideoGreetingsDetail interface
 */
export interface VideoGreetingsDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
