import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import CreatorDetail from "../models/creator-details/creator-detail.model"
import ProperWallet from "../models/propercoins/properWallet.model"
import ProperWalletModel from "../models/propercoins/properWallet.model"
import Transaction from "../models/transactions/transaction.model"
import { UserDetailDocument } from "../models/user-details/user-detail.interface"
import UserDetail from "../models/user-details/user-detail.model"

import IProperWallet from "./../models/propercoins/properWallet.interface"

const createUserDetail = async (userDetailDate: DocumentDefinition<UserDetailDocument>) => {
  try {
    const createUserDetailResponse = await UserDetail.UserDetailModel.create(userDetailDate)
    if (createUserDetailResponse) {
      return createUserDetailResponse
    }
    throw new Error(`Sorry some errors occurred while createUserDetailResponse`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const findUserDetailById = async (query: FilterQuery<UserDetailDocument>): Promise<UserDetailDocument | null> => {
  try {
    const findUserDetailById: any = await UserDetail.UserDetailModel.findOne({
      id: query
    })
    if (findUserDetailById) {
      return findUserDetailById
    }
    throw new Error(`findUserDetailById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateUserDetailById = async (
  userDetailId: string,
  payload: UpdateQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const updateUserDetailByIdResponse: any = await UserDetail.UserDetailModel.findByIdAndUpdate(
      userDetailId,
      payload,
      { upsert: false, new: true }
    )
    if (updateUserDetailByIdResponse) {
      return updateUserDetailByIdResponse
    }
    throw new Error(`updateUserDetailByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const deleteUserDetailById = async (userDetailId: string): Promise<UserDetailDocument | null> => {
  try {
    const deleteUserDetailByIdResponse: any = await UserDetail.UserDetailModel.deleteOne({ id: userDetailId })
    if (deleteUserDetailByIdResponse) {
      return deleteUserDetailByIdResponse
    }
    throw new Error(`deleteUserDetailByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const deleteProfilePictureById = async (userDetailId: string): Promise<UserDetailDocument | null> => {
  try {
    const deleteProfilePictureByIdResponse: any = await UserDetail.UserDetailModel.updateOne({
      id: userDetailId,
      avatar: "default.jpg"
    })
    if (deleteProfilePictureByIdResponse) {
      return deleteProfilePictureByIdResponse
    }
    throw new Error(`deleteProfilePictureByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const updateProfilePictureById = async (
  userDetailId: string,
  payload: UpdateQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const updateProfilePictureById: any = await UserDetail.UserDetailModel.findByIdAndUpdate(userDetailId, payload, {
      upsert: false,
      new: true
    })
    if (updateProfilePictureById) {
      return updateProfilePictureById
    }
    throw new Error(`updateProfilePictureById not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const updateProfileBannerById = async (
  userDetailId: string,
  payload: UpdateQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const updateProfileResponse: any = await UserDetail.UserDetailModel.findByIdAndUpdate(userDetailId, payload, {
      upsert: false,
      new: true
    })
    if (updateProfileResponse) {
      return updateProfileResponse
    }
    throw new Error(`updateProfileResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const blockUserById = async (
  userDetailId: string,
  payload: UpdateQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const blockUserByIdResponse: any = await UserDetail.UserDetailModel.findOne({
      _id: userDetailId,
      blockUser: { $in: [payload] }
    })
    if (!blockUserByIdResponse) {
      let data: any = await UserDetail.UserDetailModel.findOne({
        _id: userDetailId
      })
      data.blockUser.push(payload)
      data.save()
      return data
    }
    throw new Error(`blockUserByIdResponse alredy in record`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const unBlockUserById = async (
  userDetailId: string,
  payload: UpdateQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {

    const blockUserByIdResponse: any = await UserDetail.UserDetailModel.findOne({
      _id: userDetailId,
      blockUser: { $in: [payload] }
    })
    console.log(blockUserByIdResponse)

    if (blockUserByIdResponse) {
      let data: any = await UserDetail.UserDetailModel.findOne({
        _id: userDetailId
      })
      data.blockUser.pull(payload)
      data.save()
      return data
    }
    throw new Error(`unBlockUserByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const blockListById = async (userDetailId: FilterQuery<UserDetailDocument>): Promise<UserDetailDocument | null> => {
  try {
    const findUserDetailById: any = await UserDetail.UserDetailModel.findOne({
      _id: userDetailId
    }).populate([
      {
        path: "blockUser",
        select: {
          id: true,
          profileName: true,
          userName: true,
          role: true,
          avatar: true,
          banner: true,
          handle: true
        }
      }
    ])
    if (findUserDetailById) {
      return findUserDetailById
    }
    throw new Error(`findUserDetailById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const deleteProfileBannerById = async (userDetailId: string): Promise<UserDetailDocument | null> => {
  try {
    const deleteProfileBannerByIdResponse: any = await UserDetail.UserDetailModel.updateOne({
      id: userDetailId,
      banner: "default.jpg"
    })
    if (deleteProfileBannerByIdResponse) {
      return deleteProfileBannerByIdResponse
    }
    throw new Error(`deleteProfileBannerByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const allUsersPagination = async (query: number): Promise<UserDetailDocument | null> => {
  try {
    const allUsersPagination: any = await UserDetail.UserDetailModel.find()
      .skip((query - 1) * 10)
      .limit(10)
    if (allUsersPagination) {
      return allUsersPagination
    }
    throw new Error(`allUsersPagination details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const banUsersById = async (userDetailId: string): Promise<UserDetailDocument | null> => {
  try {
    const banUsersById: any = await UserDetail.UserDetailModel.findByIdAndUpdate(
      { _id: userDetailId },
      { status: "ban" },
      { upsert: false, new: true }
    )
    if (banUsersById) {
      return banUsersById
    }
    throw new Error(`banUsersById not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const getUsersById = async (userDetailId: string): Promise<UserDetailDocument | null> => {
  try {
    const getUsersById: any = await UserDetail.UserDetailModel.findOne({
      _id: userDetailId
    })
    if (getUsersById) {
      return getUsersById
    }
    throw new Error(`getUsersById not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const searchUsersByUsername = async (query: string): Promise<UserDetailDocument | null> => {
  try {
    const regex = new RegExp(query, "ig")
    const getUsersById: any = await UserDetail.UserDetailModel.find({
      userName: { $regex: regex }
    })
    console.log(getUsersById)

    if (getUsersById) {
      return getUsersById
    }
    throw new Error(`getUsersById not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const searchThroughFriendById = async (query: FilterQuery<UserDetailDocument>): Promise<UserDetailDocument | null> => {
  try {
    const username = query.username
    const regex = new RegExp(username, "i")
    const searchThroughFriendById: any = await UserDetail.UserDetailModel.findOne({ _id: query.userId }).populate([
      {
        path: "friendList",
        match: {
          userName: { $regex: regex }
        },
        select: {
          id: true,
          profileName: true,
          userName: true,
          role: true,
          avatar: true,
          banner: true
        }
      }
    ])
    if (searchThroughFriendById) {
      return searchThroughFriendById
    }
    throw new Error(`searchThroughFriendById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const tipCreator = async (payload: any): Promise<IProperWallet | any> => {
  try {
    const checkUserWallet: any = await ProperWalletModel.findOne({
      properfansId: payload.sender
    })
    const checkCreatorWallet: any = await ProperWalletModel.findOne({
      properfansId: payload.receiver
    })

    if (checkUserWallet) {
      if (checkCreatorWallet) {
        const userWalletCoins = Number(checkUserWallet.coins)
        const creatorWalletCoins = Number(checkCreatorWallet.coins)

        const coinsToSend = Number(payload.amount)

        if (userWalletCoins >= coinsToSend) {
          await Transaction.TransactionModel.create(payload)

          const calculatedUserCoins = userWalletCoins - coinsToSend
          const calculatedCreatorCoins = creatorWalletCoins + coinsToSend

          const updateUserCoins = await ProperWallet.findByIdAndUpdate(
            checkUserWallet._id,
            { coins: calculatedUserCoins },
            { upsert: false, new: true }
          )
          const updateCreatorCoins = await ProperWallet.findByIdAndUpdate(
            checkCreatorWallet._id,
            { coins: calculatedCreatorCoins },
            { upsert: false, new: true }
          )

          const updatedWallets = {
            userWallet: updateUserCoins,
            creatorWallet: updateCreatorCoins
          }

          return updatedWallets
        } else {
          throw new Error(`Insufficient coins`)
        }
      } else {
        throw new Error(`Creator Wallet not found`)
      }
    } else {
      throw new Error(`User Wallet not found`)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

const isCreator = async (query: string): Promise<UserDetailDocument | null> => {
  try {
    const getUsersById: any = await UserDetail.UserDetailModel.find({
      role: "creator",
      _id: query
    })

    return getUsersById
  } catch (error: any) {
    throw new Error(error)
  }
}
const searchUserDetailByQuery = async (query: string): Promise<UserDetailDocument | null> => {
  try {
    const regex = new RegExp(query, "ig")
    const searchUserDetailByQuery: any = await UserDetail.UserDetailModel.find({
      role: "creator",
      username: { $regex: regex }
    })
    console.log(searchUserDetailByQuery)

    if (searchUserDetailByQuery) {
      return searchUserDetailByQuery
    }
    throw new Error(`searchUserDetailByQuery not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const filterUserDetailByRange = async (max: number, min: number): Promise<UserDetailDocument | null> => {
  try {
    const searchUserDetailByQuery: any = await UserDetail.UserDetailModel.find({
      followerCount: { $lt: max, $gt: min }
    })
    console.log(searchUserDetailByQuery)

    if (searchUserDetailByQuery) {
      return searchUserDetailByQuery
    }
    throw new Error(`searchUserDetailByQuery not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const filterUserDetailByRegion = async (region: string): Promise<UserDetailDocument | null> => {
  try {
    const searchUserDetailByQuery: any = await UserDetail.UserDetailModel.find({
      country: region
    })

    if (searchUserDetailByQuery) {
      return searchUserDetailByQuery
    }
    throw new Error(`searchUserDetailByQuery not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const verifyUserByHandle = async (handle: string): Promise<UserDetailDocument | null> => {
  try {
    const verifyUserByHandle: any = await UserDetail.UserDetailModel.findOne({
      handle
    })

    return verifyUserByHandle
  } catch (error: any) {
    throw new Error(error)
  }
}
const verifyUserByUsername = async (username: string): Promise<UserDetailDocument | null> => {
  try {
    const verifyUserByUsername: any = await UserDetail.UserDetailModel.findOne({
      username
    })

    if (verifyUserByUsername) {
      return verifyUserByUsername
    }

    throw new Error(`verifyUserByHandle not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const countUserCreator = async (): Promise<UserDetailDocument | null> => {
  try {
    const countUserCreator: any = await UserDetail.UserDetailModel.find().count()

    if (countUserCreator) {
      return countUserCreator
    }

    throw new Error(`verifyUserByHandle not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const properFanVerification = async (userId: String): Promise<UserDetailDocument | null> => {
  try {
    const countUserCreator: any = await UserDetail.UserDetailModel.findOne({ userId })

      return countUserCreator


  } catch (error: any) {
    throw new Error(error)
  }
}
const creatorByCategories = async (categoriesList: String): Promise<UserDetailDocument | null> => {
  try {
    const Creator = await CreatorDetail.CreatorDetailModel.find()
    let UserIds = Creator.map(function (obj: any) {
      return obj.userId
    })
    const countUserCreator: any = await UserDetail.UserDetailModel.find({
      favCategoryList: { $in: categoriesList },
      _id: { $in: UserIds }
    })

    return countUserCreator
  } catch (error: any) {
    throw new Error(error)
  }
}

const findUserDetailByHandle = async (
  query: FilterQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const findUserDetailByHandle: any = await UserDetail.UserDetailModel.findOne({
      handle: query
    })
    if (findUserDetailByHandle) {
      return findUserDetailByHandle
    }
    throw new Error(`findUserDetailByHandle details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const searchUser = async (
  username: string
): Promise<UserDetailDocument | null> => {
  try {
    const regex = new RegExp(username, 'i') // i for case insensitive
    const verifyUserByUsername: any = await UserDetail.UserDetailModel.find({userName: {$regex: regex}})

    return verifyUserByUsername
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  findUserDetailById,
  createUserDetail,
  updateUserDetailById,
  deleteUserDetailById,
  deleteProfilePictureById,
  updateProfilePictureById,
  updateProfileBannerById,
  blockUserById,
  unBlockUserById,
  blockListById,
  deleteProfileBannerById,
  banUsersById,
  searchThroughFriendById,
  getUsersById,
  allUsersPagination,
  tipCreator,
  searchUsersByUsername,
  isCreator,
  searchUserDetailByQuery,
  searchUser,
  filterUserDetailByRange,
  filterUserDetailByRegion,
  verifyUserByHandle,
  verifyUserByUsername,
  countUserCreator,
  properFanVerification,
  creatorByCategories,
  findUserDetailByHandle
}
