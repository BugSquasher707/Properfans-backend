import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { BrandCategoriesDocument } from '../models/brand-categories/brand-categories.interface'
import BrandCategories from '../models/brand-categories/brand-categories.model'

const createBrandCategories = async (BrandCategoriesDate: DocumentDefinition<BrandCategoriesDocument>) => {
    try {
        const createBrandCategoriesResponse = await BrandCategories.brandCategoriesModel.create(BrandCategoriesDate)
        if (createBrandCategoriesResponse) {
            return createBrandCategoriesResponse
        }
        throw new Error(`Sorry some errors occurred while creating BrandCategoriesResponse`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findBrandCategoriesById = async (query: FilterQuery<BrandCategoriesDocument>): Promise<BrandCategoriesDocument | null> => {
    try {
        const findBrandCategoriesById: any = await BrandCategories.brandCategoriesModel.findOne({ _id: query })
        if (findBrandCategoriesById) {
            return findBrandCategoriesById
        }
        throw new Error(`findBrandCategoriesById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateBrandCategoriesById = async (brandCategoryId: string, payload: UpdateQuery<BrandCategoriesDocument>): Promise<BrandCategoriesDocument | null> => {
    try {
        const updateBrandCategoriesById: any = await BrandCategories.brandCategoriesModel.findByIdAndUpdate(brandCategoryId, payload, { upsert: false, new: true })
        if (updateBrandCategoriesById) {
            return updateBrandCategoriesById
        }
        throw new Error(`updateBrandCategoriesById not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteBrandCategoriesById = async (brandCategoryId: string): Promise<BrandCategoriesDocument | null> => {
    try {
        const deleteBrandCategoriesByIdResponse: any = await BrandCategories.brandCategoriesModel.deleteOne({ _id: brandCategoryId })
        if (deleteBrandCategoriesByIdResponse) {
            return deleteBrandCategoriesByIdResponse
        }
        throw new Error(`deleteBrandCategoriesByIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createBrandCategories, findBrandCategoriesById, updateBrandCategoriesById, deleteBrandCategoriesById }
