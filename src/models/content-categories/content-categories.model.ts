import mongoose from 'mongoose'

import { ContentCategoriesDocument } from "./content-categories.interface"

/**
 * contentCategoriesSchema for the database
 */
const contentCategoriesSchema = new mongoose.Schema({
    media: { type: String, required: true },
    category: { type: String, required: true },
}, {
    timestamps: true, minimize: false
})

contentCategoriesSchema.set('toJSON', {
    virtuals: true
})

const contentCategoriesModel = mongoose.model<ContentCategoriesDocument>("ContentCategories", contentCategoriesSchema, 'contentCategories')

export default { contentCategoriesModel }
