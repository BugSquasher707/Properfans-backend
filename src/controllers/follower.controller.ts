
import { Request, Response } from 'express'

import FollowerService from "../services/follower.service"



const brandPaginateFollowers = async (req: Request | any, res: Response) => {
    try {
        const clubId: String = req.params.clubId
        const pageNo: Number = req.query.pageNo
        const payload = { clubId, pageNo }

        console.log(payload, 'payload')

        await FollowerService.findFollowersByBrandIdPaginate(payload).then((findBrandByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findBrandByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}
const latestFollowersByBrand = async (req: Request | any, res: Response) => {
    try {
        const clubId: String = req.params.clubId
        const pageNo: Number = req.query.pageNo
        await FollowerService.latestFollowersByBrand({ clubId, pageNo }).then((findBrandByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findBrandByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}



export default { brandPaginateFollowers, latestFollowersByBrand }
