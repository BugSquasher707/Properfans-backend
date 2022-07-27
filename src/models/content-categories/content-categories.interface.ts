import mongoose from "mongoose"

/**
 * Content Categories
 */
export interface ContentCategoriesDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
