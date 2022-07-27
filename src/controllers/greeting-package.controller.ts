import { Request, Response } from 'express'

import GreetingPackageService from "../services/greeting-package.service"

const createGreetingPackage = async (req: Request | any, res: Response) => {
    try {
        const payload = req.body
        await GreetingPackageService.creatGreetingPackage(payload).then((creatGreetingResponse: any) => {
            return res.status(200).send({
                status: true,
                data: creatGreetingResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}


const updatGreetingPackageById = async (req: Request | any, res: Response) => {

    try {
        const payload = req.body
        const packageId: any = req.params.packageId
        await GreetingPackageService.updateGreetingPackageById(packageId, payload).then((updatGreetingByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updatGreetingByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const getGreetingPackageById = async (req: Request, res: Response) => {
    try {
        const packageId: any = req.params.packageId
        await GreetingPackageService.findGreetingPackageById(packageId).then((findPostByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findPostByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const deleteGreetingPackageById = async (req: Request, res: Response) => {
    try {
        const packageId: any = req.params.packageId
        await GreetingPackageService.deleteGreetingPackageById(packageId).then((deletGreetingByIdResponse: any) => {
            console.log("deletGreetingByIdResponse", deletGreetingByIdResponse)
            return res.status(200).send({
                status: true,
                data: deletGreetingByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

export default {createGreetingPackage, updatGreetingPackageById, getGreetingPackageById, deleteGreetingPackageById}
