import { Request, Response } from 'express'

import brandCategoryService from '../services/brand-categories.service'


const createBrandCategories = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await brandCategoryService.createBrandCategories(payload).then((createBrandCategoriesResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createBrandCategoriesResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findBrandCategoriesById = async (req: Request, res: Response) => {
    try {
        const brandCategoryId: any = req.params.brandCategoryId
        await brandCategoryService.findBrandCategoriesById(brandCategoryId).then((findBrandCategoriesByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findBrandCategoriesByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updateBrandCategoriesById = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const brandCategoryId: any = req.params.brandCategoryId
        await brandCategoryService.updateBrandCategoriesById(brandCategoryId, payload).then((updateBrandCategoriesByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateBrandCategoriesByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteBrandCategoriesById = async (req: Request, res: Response) => {
    try {
        const brandCategoryId: any = req.params.brandCategoryId
        await brandCategoryService.deleteBrandCategoriesById(brandCategoryId).then((deleteBrandCategoriesByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteBrandCategoriesByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createBrandCategories, findBrandCategoriesById, updateBrandCategoriesById, deleteBrandCategoriesById}
