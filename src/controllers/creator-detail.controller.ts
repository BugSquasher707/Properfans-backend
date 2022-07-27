import { Request, Response } from 'express'

import CreatorDetailService from "../services/creator-details.service"

const getCreatorDetailById = async (req: Request, res: Response) => {

    try {
        const userId: any = req.params.userId
        await CreatorDetailService.findCreatorById(userId).then((findCreatorDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCreatorDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const createCreatorDetail = async (req: Request | any, res: Response) => {

    try {
        const userId = req.params.userId
        const payload = { ...req.body, userId }
        await CreatorDetailService.createCreator(payload).then((createCreatorDetailResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createCreatorDetailResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateCreatorDetailById = async (req: Request | any, res: Response) => {

    try {
        const userId = req.params.userId
        const payload = req.body
        await CreatorDetailService.updateCreatorDetailsById(userId, payload).then((updateCreatorDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateCreatorDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const deleteCreatorDetailById = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userId
        await CreatorDetailService.deleteCreatorDetailsById(userId).then((deleteCreatorDetialByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteCreatorDetialByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const filterCreatorDetailByBrandCategory = async (req: Request, res: Response) => {

    try {
        const query: any = req.params.query
        await CreatorDetailService.filterCreatorDetailByBrandCategory(query).then((findCreatorDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCreatorDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}
const filterCreatorDetailByContentCategory = async (req: Request, res: Response) => {

    try {
        const query: any = req.params.query
        await CreatorDetailService.filterCreatorDetailByContentCategory(query).then((findCreatorDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCreatorDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}
export default { filterCreatorDetailByContentCategory,filterCreatorDetailByBrandCategory,getCreatorDetailById, createCreatorDetail, updateCreatorDetailById, deleteCreatorDetailById }
