import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import BrandFollow from "../models/brand-follow/brand-follow.model"
import BrandSubscription from "../models/brand-subscription/brand-subscription.model"
import { BrandTierDocument } from "../models/brand-tiers/brand-tiers.interface"
import { BrandDocument } from "../models/brands/brand.interface"
import Brand from "../models/brands/brand.model"
import CreatorDetail from "../models/creator-details/creator-detail.model"
import Post from "../models/posts/post.model"
import Tips from '../models/tips/tips.model'
import { UserDetailDocument } from "../models/user-details/user-detail.interface"
import UserDetail from "../models/user-details/user-detail.model"
import User from "../models/user-details/user-detail.model"

const createBrand = async (BrandDate: DocumentDefinition<BrandDocument>) => {
  try {
    const createBrandResponse = await Brand.BrandModel.create(BrandDate)
    if (createBrandResponse) {
      return createBrandResponse
    }
    throw new Error(`Sorry some errors occurred while createBrandResponse`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const findMyBrand = async (
  query: FilterQuery<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    const findBrandById: any = await Brand.BrandModel.find({
      owner: query,
    }).populate({
      path: "tiers",
    })
    if (findBrandById) {
      return findBrandById
    }
    throw new Error(`findBrandById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findBrandById = async (
  query: FilterQuery<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    const findBrandById: any = await Brand.BrandModel.findOne({
      _id: query,
    }).populate({
      path: "tiers",
    })
    if (findBrandById) {
      return findBrandById
    }
    throw new Error(`findBrandById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getBrandsById = async (
  query: FilterQuery<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    const getBrandsById: any = await Brand.BrandModel.findOne({ _id: query })
    if (getBrandsById) {
      return getBrandsById
    }
    throw new Error(`getBrandsById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateBrandById = async (
  brandId: string,
  payload: UpdateQuery<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    const updateBrandByIdResponse: any =
      await Brand.BrandModel.findByIdAndUpdate(brandId, payload, {
        upsert: false,
        new: true,
      })
    if (updateBrandByIdResponse) {
      return updateBrandByIdResponse
    }
    throw new Error(`updateBrandByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const deleteBrandById = async (
  brandId: string
): Promise<BrandDocument | null> => {
  try {
    const deleteBrandByIdResponse: any = await Brand.BrandModel.deleteOne({
      id: brandId,
    })
    if (deleteBrandByIdResponse) {
      return deleteBrandByIdResponse
    }
    throw new Error(`deleteBrandByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const allBrandsPagination = async (
  query: number
): Promise<BrandDocument | null> => {
  try {
    const allBrandsPagination: any = await Brand.BrandModel.find()
      .skip((query - 1) * 10)
      .limit(10)
    if (allBrandsPagination) {
      return allBrandsPagination
    }
    throw new Error(`allBrandsPagination details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getBrandsCount = async (): Promise<BrandDocument | null> => {
  try {
    const getBrandsCount: any = await Brand.BrandModel.find().count()
    if (getBrandsCount) {
      return getBrandsCount
    }
    throw new Error(`getBrandsCount details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const brandCommunitySearchById = async (
  query: FilterQuery<UserDetailDocument>
): Promise<UserDetailDocument | null> => {
  try {
    const handle = query.handle
    const regex = new RegExp(handle, "i")
    const brandCommunitySearchById: any =
      await UserDetail.UserDetailModel.findOne({ _id: query.userId }).populate([
        {
          path: "followBrand",
          match: {
            handle: { $regex: regex },
          },
        },
      ])
    if (brandCommunitySearchById) {
      return brandCommunitySearchById
    }
    throw new Error(`brandCommunitySearchById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const brandFansById = async (
  query: FilterQuery<BrandDocument>
): Promise<BrandDocument | null> => {
  try {
    const brandFansById: any = await Brand.BrandModel.findOne({
      _id: query.brandId,
    }).populate([
      {
        path: "followers",
        select: {
          id: true,
          profileName: true,
          username: true,
          role: true,
          avatar: true,
          banner: true,
        },
      },
    ])
    if (brandFansById) {
      return brandFansById
    }
    throw new Error(`brandFansById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateFeaturedBrands = async (
  query: any
): Promise<BrandDocument | null> => {
  try {
    const updateFeaturedBrands: any = await Brand.BrandModel.updateMany(
      { _id: { $in: query } },
      { featured: true },
      { upsert: false, new: true }
    )
    if (updateFeaturedBrands) {
      return updateFeaturedBrands
    }
    throw new Error(`updateFeaturedBrands details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const allFeaturedBrands = async (): Promise<BrandDocument | null> => {
  try {
    const updateFeaturedBrands: any = await Brand.BrandModel.find({
      featured: true,
    })
    if (updateFeaturedBrands) {
      return updateFeaturedBrands
    }
    throw new Error(`updateFeaturedBrands details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * @param brandId Unique identifier of a brand
 * @param filters Parameters of the query string
 * @returns Array of BrandSubscription models
 */
const brandTopSubs = async (brandId: string, filters: any) => {
  if (!filters || Object.keys(filters).length === 0)
    return await BrandSubscription.find({ brandId })
      .sort({ createdAt: "asc" })
      .limit(25)
  const limit: number = Math.min(
    50,
    !isNaN(Math.abs(parseInt(filters.limit)))
      ? Math.abs(parseInt(filters.limit))
      : 25
  )
  const total: number = await BrandSubscription.estimatedDocumentCount()
  if (total === 0) return Promise.resolve([])
  const totalPages: number = Math.ceil(total / limit)
  const page: number = Math.min(
    totalPages,
    Math.max(
      1,
      !isNaN(Math.abs(parseInt(filters.page)))
        ? Math.abs(parseInt(filters.page))
        : 1
    )
  )
  return await BrandSubscription.find({ brandId })
    .sort({ createdAt: "asc" })
    .limit(limit)
    .skip(limit * (page - 1))
}

const createBrandFollow = async (clubId: string, userId: string) => {
  try {
    const userExist: any = await User.UserDetailModel.findById(userId)
    const clubExist: any = await Brand.BrandModel.findById(clubId)

    if (!userExist) throw { status: 400, message: "There's no user with that id" }
    if (!clubExist) throw { status: 400, message: "There's no club with that id" }

    if (userExist && clubExist) {
      const createFollow: any = await BrandFollow.create({ club: clubId, user: userId })

      if (createFollow) {
        clubExist.followers.push(userId)
        await Brand.BrandModel.findByIdAndUpdate(clubId, clubExist, { new: true, upsert: false, runValidators: true })
        userExist.followBrand.push(clubId)
        userExist.save()
        return createFollow
      }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const createMultiBrandFollow = async (query: any): Promise<BrandDocument | any> => {
  try {
    const userExist: any = await User.UserDetailModel.findById({ _id: query.userId })
    if (!userExist) throw { status: 400, message: "There's no user with that id" }
    let multiInsertArray: any = []
    for (let i = 0; i < query.clubIdArray.length; i++) {
      const element = query.clubIdArray[i]
      multiInsertArray = [...multiInsertArray, { club: element, user: query.userId }]
    }
    if (userExist) {
      const createFollow: any = await BrandFollow.insertMany(multiInsertArray)

      if (createFollow) {
        const clubs = await Brand.BrandModel.updateMany(
          { _id: { $in: query.clubIdArray } },
          { $push: { followers: query.userId } },
          { multi: true, upsert: true, new: true }
        )

        if (clubs) {
          userExist.followBrand.push(...query.clubIdArray)
          userExist.save()
        }

        return createFollow
      }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const deleteBrandFollow = async (clubId: string, userId: string) => {
  try {
    const userExist: any = await User.UserDetailModel.findById(userId)
    const clubExist: any = await Brand.BrandModel.findById(clubId)

    if (!userExist) throw { status: 400, message: "There's no user with that id" }
    if (!clubExist) throw { status: 400, message: "There's no club with that id" }

    if (userExist && clubExist) {
      const unFollowClub: any = await BrandFollow.deleteOne({ club: clubId, user: userId })

      if (unFollowClub) {
        clubExist.followers.pull(userId)
        await Brand.BrandModel.findByIdAndUpdate(clubId, clubExist, { new: true, upsert: false, runValidators: true })
        return unFollowClub
      }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getBrandFollows = async (brandHandle: string, filters: any) => {
  try {
    if (!filters || Object.keys(filters).length === 0)
      return await BrandFollow.find({ brandHandle: brandHandle })
        .sort({ createdAt: "desc" })
        .limit(25)
    if (filters.username)
      return await BrandFollow.find({
        brandHandle: brandHandle,
        username: filters.username,
      })
    const limit: number = Math.min(
      50,
      !isNaN(Math.abs(parseInt(filters.limit)))
        ? Math.abs(parseInt(filters.limit))
        : 25
    )
    const total: number = await BrandFollow.estimatedDocumentCount()
    if (total === 0) return Promise.resolve([])
    const totalPages: number = Math.ceil(total / limit)
    const page: number = Math.min(
      totalPages,
      Math.max(
        1,
        !isNaN(Math.abs(parseInt(filters.page)))
          ? Math.abs(parseInt(filters.page))
          : 1
      )
    )
    return await BrandFollow.find({ brandHandle: brandHandle })
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (page - 1))
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const brandTagAvailable = async (
  handle: string
): Promise<BrandDocument | null> => {
  try {
    let brandTagAvailable: any = await Brand.BrandModel.findOne(
      { handle },
      "posts"
    ).populate({ path: "posts", select: { tags: true } })
    brandTagAvailable = brandTagAvailable.posts.map((t: any) => t.tags)
    brandTagAvailable = [].concat.apply([], brandTagAvailable)

    if (brandTagAvailable) {
      return brandTagAvailable
    }
    throw new Error(`brandTagAvailable not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getPostsBySubTier = async (
  brandId: string,
  userId: string,
  filters: any
) => {
  try {
    const subscription = await BrandSubscription.findOne({
      brandId,
      userId,
    }).populate({ path: "brandTierId", select: "tierLevel" })
    const query = { brandId, tierAccess: { $lte: 0 } }
    if (subscription) {
      query.tierAccess = {
        $lte: (subscription.brandTierId as unknown as BrandTierDocument)
          .tierLevel,
      }
    }
    if (!filters || Object.keys(filters).length === 0)
      return await Post.PostModel.find(query)
        .sort({ createdAt: "desc" })
        .limit(25)
    const limit: number = Math.min(
      50,
      !isNaN(Math.abs(parseInt(filters.limit)))
        ? Math.abs(parseInt(filters.limit))
        : 25
    )
    const total: number = await BrandFollow.estimatedDocumentCount()
    if (total === 0) return Promise.resolve([])
    const totalPages: number = Math.ceil(total / limit)
    const page: number = Math.min(
      totalPages,
      Math.max(
        1,
        !isNaN(Math.abs(parseInt(filters.page)))
          ? Math.abs(parseInt(filters.page))
          : 1
      )
    )
    return await Post.PostModel.find(query)
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (page - 1))
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const verifyBrandByHandle = async (
  handle: string
): Promise<UserDetailDocument | null> => {
  try {
    const verifyUserByHandle: any = await Brand.BrandModel.findOne({
      handle,
    }).populate({
        path: "followers"
    })
    .populate({
        path: "owner"
    })
    .populate({
        path: "tiers"
    })

    return verifyUserByHandle

  } catch (error: any) {
    throw new Error(error)
  }
}
const brandByHandle = async (
  handle: string
): Promise<UserDetailDocument | null> => {
  try {
    const verifyUserByHandle: any = await Brand.BrandModel.findOne({
      handle,
    })

    return verifyUserByHandle

  } catch (error: any) {
    throw new Error(error)
  }
}
const verifyBrandByName = async (
  name: string
): Promise<UserDetailDocument | null> => {
  try {
    const verifyUserByUsername: any = await Brand.BrandModel.findOne({
      name,
    })

    return verifyUserByUsername

  } catch (error: any) {
    throw new Error(error)
  }
}
const searchHandleClub = async (handle: string): Promise<UserDetailDocument | null> => {
  try {
    const regex = new RegExp(handle, "i") // i for case insensitive
    const verifyUserByUsername: any = await Brand.BrandModel.find({
      handle: { $regex: regex },
    })

    return verifyUserByUsername
  } catch (error: any) {
    throw new Error(error)
  }
}
const checkClubFollower = async (clubId: string, userId: string): Promise<BrandDocument | null> => {
  try {
    const checkClubFollower: any = await Brand.BrandModel.findOne({
      _id: clubId,
      followers: { $in: userId }
    })

    return checkClubFollower
  } catch (error: any) {
    throw new Error(error)
  }
}
const brandActivity = async (clubId: string): Promise<BrandDocument | null> => {
  try {
    const tipsData: any = await Tips.TipsModel.find({ brandId:clubId },"brandId").populate("brandId").sort({createdAt:-1})
    let Users = tipsData.map(function (obj: any) {
      return {brand:{
        id: obj.brandId.id,
        avatar: obj.brandId.avatar,
        banner: obj.brandId.banner,
        biography: obj.brandId.biography,
        userName: obj.brandId.userName,
        verified: true,
        handle: obj.brandId.handle
      }
        ,type:"Donation",id:obj.id}
    })

    return Users
  } catch (error: any) {
    throw new Error(error)
  }
}
const brandActivityByUser = async (query:{clubId:string,userId:string}): Promise<BrandDocument | null> => {
  try {
    const tipsData: any = await Tips.TipsModel.find({ brandId:query.clubId,user:query.userId },"user").populate("user").sort({createdAt:-1})
   let Users = tipsData.map(function (obj: any) {
      return {user:{
        id: obj.user.id,
        avatar: obj.user.avatar,
        banner: obj.user.banner,
        biography: obj.user.biography,
        userName: obj.user.userName,
        verified: true,
        handle: obj.user.handle
      }
        ,type:"Donation",id:obj.id}
    })

    return Users
  } catch (error: any) {
    throw new Error(error)
  }
}

const findBrandByCategory = async (query: FilterQuery<BrandDocument>): Promise<BrandDocument | null> => {
  try {
    const Creator = await CreatorDetail.CreatorDetailModel.find()
    let UserIds = Creator.map(function (obj: any) {
      return obj.userId
    })
    const countUserCreator: any = await UserDetail.UserDetailModel.find({
      favCategoryList: { $in: query },
      _id: { $in: UserIds }
    })

    let creatorIds = countUserCreator.map(function (obj2: any) {
      return obj2._id
    })

    const findBrandByCategory: any = await Brand.BrandModel.find({owner:{$in:creatorIds}}).populate({
      path: "owner"
  })
    if (findBrandByCategory) {
      return findBrandByCategory
    }
    throw new Error(`findBrandByCategory details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default {
  brandActivity,
  brandActivityByUser,
  brandTagAvailable,
  allFeaturedBrands,
  updateFeaturedBrands,
  getBrandsCount,
  getBrandsById,
  allBrandsPagination,
  findMyBrand,
  brandCommunitySearchById,
  findBrandById,
  createBrand,
  updateBrandById,
  deleteBrandById,
  brandTopSubs,
  createBrandFollow,
  brandFansById,
  deleteBrandFollow,
  getBrandFollows,
  getPostsBySubTier,
  verifyBrandByHandle,
  verifyBrandByName,
  searchHandleClub,
  checkClubFollower,
  createMultiBrandFollow,
  brandByHandle,
  findBrandByCategory
}
