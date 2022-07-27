import { Request, Response } from 'express'

import HashTagsService from "../services/hash-tags.service"

const createGreetingPackage = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await HashTagsService.createHashTags(payload).then((createHashTagsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createHashTagsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getAllHashTags = async (req: Request, res: Response) => {
    try {
        await HashTagsService.getAllHashTags().then((getAllHashTagsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: getAllHashTagsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updatHashTags = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const hashTagId: any = req.params.hashTagId
        await HashTagsService.updateHashTags(hashTagId, payload).then((updatHashTagsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updatHashTagsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const deleteHashTags = async (req: Request, res: Response) => {
    try {
        const hashTagId: any = req.params.hashTagId
        await HashTagsService.deleteHashTags(hashTagId).then((deleteHashTagsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: deleteHashTagsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const searchHashTags = async (req: Request, res: Response) => {
    try {
        const hashTag: any = req.params.hashTag
        await HashTagsService.searchHashTags(hashTag).then((searchHashTagsResponse: any) => {
            return res.status(200).send({
                status: true,
                data: searchHashTagsResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createGreetingPackage, getAllHashTags, updatHashTags, deleteHashTags, searchHashTags }
