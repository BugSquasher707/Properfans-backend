import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import BrandSubscription from "../models/brand-subscription/brand-subscription.model"
import { BrandTierDocument } from "../models/brand-tiers/brand-tiers.interface"
import BrandTier from "../models/brand-tiers/brand-tiers.model"
import Brand from "../models/brands/brand.model"
import User from "../models/user-details/user-detail.model"

const createBrandTier = async (BrandDate: DocumentDefinition<BrandTierDocument | any>) => {
  try {
    const createBrandTierResponse: any = await BrandTier.BrandTierModel.create(BrandDate.body)

    if (createBrandTierResponse) {
      const findBrand: any = await Brand.BrandModel.findOne({ _id: BrandDate.clubId })
      findBrand.tiers.push(createBrandTierResponse._id)
      await Brand.BrandModel.findByIdAndUpdate(BrandDate.brandId, findBrand, { upsert: false, new: true })
      return createBrandTierResponse
    }
    throw new Error(`Sorry some errors occurred while createBrandTierResponse`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const findBrandTierByHandle = async (query: FilterQuery<BrandTierDocument>): Promise<BrandTierDocument | null> => {
  try {
    const findBrandTierByHandle: any = await Brand.BrandModel.findOne({ handle: query }).populate({
      path: "tiers"
    })
    if (findBrandTierByHandle) {
      return findBrandTierByHandle
    }
    throw new Error(`findBrandTierByHandle details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findSpecificBrandTier = async (query: FilterQuery<BrandTierDocument>): Promise<BrandTierDocument> => {
  try {
    const { handle, tier }: any = query

    const regex = new RegExp(tier, "i")

    const findBrandSpecificTier: any = await Brand.BrandModel.findOne({ handle }).populate({
      path: "tiers",
      match: {
        tierName: { $regex: regex }
      }
    })

    if (findBrandSpecificTier) {
      return findBrandSpecificTier
    }
    throw new Error(`findBrandSpecificTier details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

//TODO: needs to trigger the subscription value from the user before creating the relation
//      this means that when this route is called it should do something like: obtain brand tier price -> realize the transaction -> create the subscription relation
//      currently this only creates the subscription relation
const createBrandSubscription = async (brandTierId: string, userId: string) => {
  try {
    const user: any = await User.UserDetailModel.findById(userId)

    if (!user) throw { status: 400, message: "There's no user with that id" }

    const brandTier: any = await BrandTier.BrandTierModel.findById(brandTierId)

    if (!brandTier) throw { status: 400, message: "There's no brand with that id" }

    const subscription: any = await BrandSubscription.create({ brandId: brandTier.brandId, brandTierId, userId })

    return subscription
  } catch (error: any) {
    throw new Error(error.message)
  }
}

//TODO: check user
const deleteBrandSubscription = async (brandTierId: string, brandSubscriptionId: string) => {
  try {
    const brandSubscription: any = await BrandSubscription.findById(brandSubscriptionId)
    if (!brandSubscription) throw { status: 400, message: "There's no subscription with that id" }
    if (brandSubscription.brandTierId !== brandTierId)
      throw { status: 400, message: "The subscription doesn't belong to the tier with that id" }
    return await BrandSubscription.findByIdAndDelete(brandSubscriptionId)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

//TODO: implement other queries (example: searching by a certain date)
const getBrandSubscriptionsByTier = async (brandTierId: string, filters: any) => {
  try {
    if (!filters || Object.keys(filters).length === 0)
      return await BrandSubscription.find({ brandTierId }).sort({ createdAt: "desc" }).limit(25)
    if (filters.username) return await BrandSubscription.find({ brandTierId, userId: filters.userId })
    const limit: number = Math.min(
      50,
      !isNaN(Math.abs(parseInt(filters.limit))) ? Math.abs(parseInt(filters.limit)) : 25
    )
    const total: number = await BrandSubscription.estimatedDocumentCount()
    if (total === 0) return Promise.resolve([])
    const totalPages: number = Math.ceil(total / limit)
    const page: number = Math.min(
      totalPages,
      Math.max(1, !isNaN(Math.abs(parseInt(filters.page))) ? Math.abs(parseInt(filters.page)) : 1)
    )
    return await BrandSubscription.find({ brandTierId })
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (page - 1))
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const getAllClubTiers = async (brandId: FilterQuery<BrandTierDocument>): Promise<BrandTierDocument | null> => {
  try {
    const getTiers: any = await BrandTier.BrandTierModel.find({ brandId })
    if (getTiers) {
      return getTiers
    }
    throw new Error(`getTiers details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getSingleClubTier = async (
  brandId: FilterQuery<BrandTierDocument>,
  tier: FilterQuery<BrandTierDocument>
): Promise<BrandTierDocument | null> => {
  try {
    const getTier: any = await BrandTier.BrandTierModel.findOne({ brandId, tierLevel: tier })
    if (getTier) {
      return getTier
    }
    throw new Error(`getTier details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateClubTier = async (
  brandId: string,
  tier: any,
  payload: UpdateQuery<BrandTierDocument>
): Promise<BrandTierDocument | null> => {
  try {
    const updateClubTierResponse: any = await BrandTier.BrandTierModel.findOneAndUpdate(
      { brandId, tierLevel: tier },
      payload,
      { upsert: false, new: true }
    )
    if (updateClubTierResponse) {
      return updateClubTierResponse
    }
    throw new Error(`updateClubTierResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  createBrandTier,
  findBrandTierByHandle,
  findSpecificBrandTier,
  createBrandSubscription,
  deleteBrandSubscription,
  getBrandSubscriptionsByTier,
  getAllClubTiers,
  getSingleClubTier,
  updateClubTier
}
