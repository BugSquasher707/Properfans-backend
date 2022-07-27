
import { Request, Response } from 'express'

import SearchService from "../services/search.service"


const searchForCreators = async (req: Request, res: Response) => {
    try {
        await SearchService.findCreator(req.query).then((findUserDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findUserDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const searchForUsers = async (req: Request, res: Response) => {
    try {
        await SearchService.findUser(req.query).then((findUserDetailByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findUserDetailByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default {
    searchForCreators,
    searchForUsers}
