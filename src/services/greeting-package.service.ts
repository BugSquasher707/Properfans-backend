import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { GreetingPackageDocument } from "../models/greeting-packages/greeting-package.interface"
import Greeting from "../models/greeting-packages/greeting-package.model"

const creatGreetingPackage = async (GreetingDate: DocumentDefinition<GreetingPackageDocument>) => {
    try {
        const creatGreetingPackageResponse = await Greeting.GreetingPackageModel.create(GreetingDate)
        if (creatGreetingPackageResponse) {
            return creatGreetingPackageResponse
        }
        throw new Error(`Sorry some errors occurred while creating greeting package`)
    } catch (error: any) {
        throw new Error(error)
    }
}



const updateGreetingPackageById = async (GreetingId: string, payload: UpdateQuery<GreetingPackageDocument>): Promise<GreetingPackageDocument | null> => {
    try {
        const updateGreetingByIdResponse: any = await Greeting.GreetingPackageModel.findByIdAndUpdate(GreetingId, payload, { upsert: false, new: true })
        if (updateGreetingByIdResponse) {
            return updateGreetingByIdResponse
        }
        throw new Error(`Sorry some errors occurred while updating greeting package`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findGreetingPackageById = async (query: FilterQuery<GreetingPackageDocument>): Promise<GreetingPackageDocument | null> => {
    try {
        const findGreetingById: any = await Greeting.GreetingPackageModel.findOne({ _id: query })
        if (findGreetingById) {
            return findGreetingById
        }
        throw new Error(`Sorry some errors occurred while finding greeting package`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const deleteGreetingPackageById = async (GreetingId: string): Promise<GreetingPackageDocument | null> => {
    try {
        const deleteGreetingByIdResponse: any = await Greeting.GreetingPackageModel.deleteOne({ _id: GreetingId })
        if (deleteGreetingByIdResponse) {
            return deleteGreetingByIdResponse
        }
        throw new Error(`Sorry some errors occurred while deleting greeting package`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {creatGreetingPackage, updateGreetingPackageById, findGreetingPackageById, deleteGreetingPackageById}
