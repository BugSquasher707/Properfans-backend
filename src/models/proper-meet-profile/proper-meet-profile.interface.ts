import mongoose from "mongoose"

/**
 * ProperMeetProfile interface
 */

export interface ProperMeetProfileDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
