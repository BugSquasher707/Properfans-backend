import { Request, Response } from 'express'

import contentCategoryService from '../services/content-categories.service'
import MediaUploader from '../utilities/mediaUploader'


const createContentCategories = async (req: Request | any, res: Response) => {
    try {
        const result: any = await MediaUploader.UploadMediaToAWS(req.file)
        const media = result.Location
        const payload: any = { media: media, category: req.body.category }
        await contentCategoryService.createContentCategories(payload).then((createContentCategoriesResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createContentCategoriesResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findContentCategories = async (req: Request, res: Response) => {
    try {
        await contentCategoryService.findContentCategories().then((findContentCategoriesResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findContentCategoriesResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updateContentCategoriesById = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const contentCategoryId: any = req.params.contentCategoryId
        await contentCategoryService.updateContentCategoriesById(contentCategoryId, payload).then((updateContentCategoriesByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateContentCategoriesByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteContentCategoriesById = async (req: Request, res: Response) => {
    try {
        const contentCategoryId: any = req.params.contentCategoryId
        await contentCategoryService.deleteContentCategoriesById(contentCategoryId).then((deleteContentCategoriesByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteContentCategoriesByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createContentCategories, findContentCategories, updateContentCategoriesById, deleteContentCategoriesById}
