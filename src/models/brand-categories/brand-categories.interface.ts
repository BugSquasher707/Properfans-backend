import mongoose from "mongoose"

/**
 * Brand Categories
 */
export interface BrandCategoriesDocument extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
