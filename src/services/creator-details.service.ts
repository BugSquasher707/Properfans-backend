import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { CreatorDetailDocument } from "../models/creator-details/creator-detail.interface"
import CreatorDetails from "../models/creator-details/creator-detail.model"
import UserDetails from "../models/user-details/user-detail.model"

const findCreatorById = async (query: FilterQuery<CreatorDetailDocument | any>): Promise<CreatorDetailDocument | any> => {
    try {
        const findCreatorDetail: any = await CreatorDetails.CreatorDetailModel.findOne({ userId: query }).populate({
            path: "userId"
        })
        if (findCreatorDetail) {
            return findCreatorDetail
        }
        throw new Error(`findCreatorDetail details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const createCreator = async (creatorData: DocumentDefinition<CreatorDetailDocument> | any) => {
    try {

        const findUserRole: any = await UserDetails.UserDetailModel.findOne({ _id: creatorData.userId })

        if(findUserRole.role === 'creator') {
            const createCreatorResponse = await CreatorDetails.CreatorDetailModel.create(creatorData)
            if (createCreatorResponse) {
                return createCreatorResponse
            }
            else{
                throw new Error(`Sorry some errors occurred while createStoryResponse`)
            }
        }
        else{
            throw new Error(`Your role is not a creator`)
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

const updateCreatorDetailsById = async (userId: string, payload: UpdateQuery<CreatorDetailDocument>): Promise<CreatorDetailDocument | null> => {
    try {
        const findCreatorDetail: any = await CreatorDetails.CreatorDetailModel.findOne({ userId })

        if(findCreatorDetail) {
            const updateCreatorDetailsByIdResponse: any = await CreatorDetails.CreatorDetailModel.findByIdAndUpdate(findCreatorDetail._id, payload, { upsert: false, new: true })
            if (updateCreatorDetailsByIdResponse) {
                return updateCreatorDetailsByIdResponse
            }
            else {
                throw new Error(`updateCreatorDetailsByIdResponse not found`)
            }
        }
        else {
            throw new Error(`updateCreatorDetailsByIdResponse not found`)
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteCreatorDetailsById = async (userId: string): Promise<CreatorDetailDocument | null> => {
    try {
        const deleteCreatorDetailsByIdResponse: any = await CreatorDetails.CreatorDetailModel.deleteOne({ userId })
        if (deleteCreatorDetailsByIdResponse) {
            return deleteCreatorDetailsByIdResponse
        }
        throw new Error(`deleteCreatorDetailsByIdResponse not found`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const filterCreatorDetailByBrandCategory = async (query: FilterQuery<CreatorDetailDocument | any>): Promise<CreatorDetailDocument | any> => {
    try {
        let findCreatorDetail: any = await CreatorDetails.CreatorDetailModel.find({ brandCatagory: {$in:[query]} }).populate({
            path: "userId",
        }).select({
            userId:true
        })
        findCreatorDetail = findCreatorDetail.map((element:any) => element.userId)
        if (findCreatorDetail) {
            return findCreatorDetail
        }
        throw new Error(`findCreatorDetail details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const filterCreatorDetailByContentCategory = async (query: FilterQuery<CreatorDetailDocument | any>): Promise<CreatorDetailDocument | any> => {
    try {
        let findCreatorDetail: any = await CreatorDetails.CreatorDetailModel.find({ contentCatagory: {$in:[query]} }).populate({
            path: "userId",
        }).select({
            userId:true
        })
        findCreatorDetail = findCreatorDetail.map((element:any) => element.userId)
        if (findCreatorDetail) {
            return findCreatorDetail
        }
        throw new Error(`findCreatorDetail details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export default {filterCreatorDetailByContentCategory, filterCreatorDetailByBrandCategory,findCreatorById, createCreator, updateCreatorDetailsById, deleteCreatorDetailsById }
