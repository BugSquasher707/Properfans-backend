import { FilterQuery } from "mongoose"

import { UserDetailDocument } from "../models/user-details/user-detail.interface"
import UserDetail from "../models/user-details/user-detail.model"

interface LooseObject {
    [key: string]: any
}



const findCreator = async (query: FilterQuery<UserDetailDocument>): Promise<UserDetailDocument | null> => {
    try {
        let searchObj: LooseObject = {}

        searchObj.role = "creator"

        if(query.followersMin && query.followersMax) {
            searchObj.followerCount = {
                $gte: query.followersMin,
                $lt: query.followersMax
            }
        }

        if(query.username) {
            searchObj.username = query.username
        }

        if(query.fansMin && query.fansMax) {
            searchObj.fansCount = {
                $gte: query.fansMin,
                $lt: query.fansMax
            }
        }

        if(query.start && query.limit) {
            searchObj.id = {
                $gte: query.start,
                $lt: query.limit
            }
        }

        if(query.keyword) {
            searchObj.profileName = { $regex: '.*' + query.keyword + '.*' }
        }

        if(query.region) {
            searchObj.country = query.region
        }

        const findUserDetailById: any = await UserDetail.UserDetailModel.find(searchObj)
        if (findUserDetailById) {
            return findUserDetailById
        }
        throw new Error(`findUserDetailById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findUser = async (query: FilterQuery<UserDetailDocument>): Promise<UserDetailDocument | null> => {
    try {
        let searchObj: LooseObject = {}

        if(query.followersMin && query.followersMax) {
            searchObj.followerCount = {
                $gte: query.followersMin,
                $lt: query.followersMax
            }
        }

        if(query.username) {
            searchObj.username = query.username
        }

        if(query.fansMin && query.fansMax) {
            searchObj.fansCount = {
                $gte: query.fansMin,
                $lt: query.fansMax
            }
        }

        if(query.start && query.limit) {
            searchObj.id = {
                $gte: query.start,
                $lt: query.limit
            }
        }

        if(query.keyword) {
            searchObj.profileName = { $regex: '.*' + query.keyword + '.*' }
        }

        if(query.region) {
            searchObj.country = query.region
        }

        const findUserDetailById: any = await UserDetail.UserDetailModel.find(searchObj)
        if (findUserDetailById) {
            return findUserDetailById
        }
        throw new Error(`findUserDetailById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default {
    findCreator,
    findUser
}
