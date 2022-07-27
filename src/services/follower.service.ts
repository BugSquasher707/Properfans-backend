import { FilterQuery } from "mongoose"

import { FollowerDocument } from "../models/follower/follower.interface"
import Follower from "../models/follower/follower.model"



const findFollowersByBrandIdPaginate = async (query: FilterQuery<FollowerDocument | any>): Promise<FollowerDocument | any> => {
    try {
        const findFollowersByBrandIdPaginate: any = await Follower.FollowerModel.find({ clubId: query.clubId }).populate([
            { path: 'club' },
            { path: 'user' },
        ]).limit(10).skip(10 * (Number(query.pageNo) - 1))
        if (findFollowersByBrandIdPaginate) {
            return findFollowersByBrandIdPaginate
        }
        throw new Error(`findFollowersByBrandIdPaginate details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const latestFollowersByBrand = async (query: FilterQuery<FollowerDocument>): Promise<FollowerDocument | null> => {
    try {
        const latestFollowersByBrand: any = await Follower.FollowerModel.find({ brandId: query.brandId })
        .populate([
            { path: 'brandId' },
            { path: 'userId' },
        ])
        .limit(10).sort({ createdAt: -1 })
        if (latestFollowersByBrand) {
            return latestFollowersByBrand
        }
        throw new Error(`latestFollowersByBrand details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default { findFollowersByBrandIdPaginate, latestFollowersByBrand }
