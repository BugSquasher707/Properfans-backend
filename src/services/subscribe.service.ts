import BrandTier from "../models/brand-tiers/brand-tiers.model"
import UserDetail from "../models/user-details/user-detail.model"

const createSubscribe = async (query: any) => {
  try {
    const UserData: any = await UserDetail.UserDetailModel.findByIdAndUpdate(
      query.userId,
      { $push: { subsTier: query.tierId } },
      {
        upsert: false,
        new: true
      }
    )

    const BrandTierData: any = await BrandTier.BrandTierModel.updateMany(
      { _id: query.tierId },
      { $push: { subscribers: query.userId } },
      { upsert: true, new: true }
    )

    // TODO: Implement
    console.log(UserData, BrandTierData)

    if (BrandTier) {
      return true
    } else {
      throw new Error(`Sorry some errors occurred while creating Comment`)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export default { createSubscribe }
