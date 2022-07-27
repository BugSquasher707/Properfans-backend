import mongoose from 'mongoose'

import { BrandCategoriesDocument } from "./brand-categories.interface"

/**
 * brandCategoriesSchema for the database
 */
const brandCategoriesSchema = new mongoose.Schema({
    category: { type: String },
}, {
    timestamps: true, minimize: false
})

const brandCategoriesModel = mongoose.model<BrandCategoriesDocument>("BrandCategories", brandCategoriesSchema, 'brandCategories')


export default { brandCategoriesModel }
