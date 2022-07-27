import { DocumentDefinition, UpdateQuery } from "mongoose"

import { ContentCategoriesDocument } from '../models/content-categories/content-categories.interface'
import ContentCategories from '../models/content-categories/content-categories.model'

const createContentCategories = async (ContentCategoriesDate: DocumentDefinition<ContentCategoriesDocument>) => {
    try {
        const createContentCategoriesResponse = await ContentCategories.contentCategoriesModel.create(ContentCategoriesDate)
        if (createContentCategoriesResponse) {
            return createContentCategoriesResponse
        }
        throw new Error(`Sorry some errors occurred while createContentCategoriesResponse`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findContentCategories = async (): Promise<ContentCategoriesDocument | null> => {
    try {
        const findContentCategories: any = await ContentCategories.contentCategoriesModel.find({})
        if (findContentCategories) {
            return findContentCategories
        }
        throw new Error(`findContentCategories details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateContentCategoriesById = async (contentCategoryId: string, payload: UpdateQuery<ContentCategoriesDocument>): Promise<ContentCategoriesDocument | null> => {
    try {
        const updateContentCategoriesById: any = await ContentCategories.contentCategoriesModel.findByIdAndUpdate(contentCategoryId, payload, { upsert: false, new: true })
        if (updateContentCategoriesById) {
            return updateContentCategoriesById
        }
        throw new Error(`updateContentCategoriesById not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteContentCategoriesById = async (contentCategoryId: string): Promise<ContentCategoriesDocument | null> => {
    try {
        const deleteContentCategoriesByIdResponse: any = await ContentCategories.contentCategoriesModel.deleteOne({ _id: contentCategoryId })
        if (deleteContentCategoriesByIdResponse) {
            return deleteContentCategoriesByIdResponse
        }
        throw new Error(`deleteContentCategoriesByIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createContentCategories, findContentCategories, updateContentCategoriesById, deleteContentCategoriesById }
