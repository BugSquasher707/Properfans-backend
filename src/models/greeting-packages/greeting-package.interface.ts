import mongoose from "mongoose"

/**
 * GreetingPackage interface
 */

export interface GreetingPackageDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
