import { FilterQuery, UpdateQuery } from "mongoose"

import ProperWallet from '../models/propercoins/properWallet.model'
import User from "../models/user-details/user-detail.model"

import IProperWallet from './../models/propercoins/properWallet.interface'

const createProperWallet = async (payload: any) => {
    try {
        const user : any = await User.UserDetailModel.exists({_id: payload.userId})
        if(!user) throw {status: 400, message: "There's no user with that id"}
        const wallet : any = await ProperWallet.create(payload.body)
        return wallet
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findUserCoinById = async (userId: string) => {
    try {
        const findUserCoinById: any = await ProperWallet.findOne({ properfansId: userId }).populate({path: 'properfansId'})
        if (findUserCoinById) {
            return findUserCoinById
        }
        throw new Error(`findUserCoinById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateUserCoinById = async (properfansId: string, payload: UpdateQuery<IProperWallet>): Promise<IProperWallet | any> => {
    try {
        const findUserWalletByIdResponse: any = await ProperWallet.findOne({ properfansId })
        if(findUserWalletByIdResponse) {
            const updateUserCoinByIdResponse: any = await ProperWallet.findByIdAndUpdate(findUserWalletByIdResponse._id, payload, { upsert: false, new: true })
            if (updateUserCoinByIdResponse) {
                return updateUserCoinByIdResponse
            }
            throw new Error(`updateUserCoinByIdResponse not found`)
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

const convertProperCoins = async (query: FilterQuery<IProperWallet>): Promise<IProperWallet | null> => {
    try {
        const convertProperCoins: any = { USD: Number(query) / 10 }
        if (convertProperCoins) {
            return convertProperCoins
        }
        throw new Error(`Conversion failed`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default { createProperWallet, findUserCoinById, updateUserCoinById, convertProperCoins }
