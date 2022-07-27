import mongoose from "mongoose"

/**
 * VideoCallBooking interface
 */
export interface VideoCallBookingDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
