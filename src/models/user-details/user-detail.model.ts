import mongoose from "mongoose"

import { UserDetailDocument } from "./user-detail.interface"

/**
 * UserDetailSchema for the database
 */
const userDetailSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    avatar: { type: String, default: "default.jpg", required: false },
    banner: { type: String, default: "default.jpg", required: false },
    dob: { type: String, required: false },
    biography: { type: String, default: "", required: false },
    blockedUsersList: { type: Number, default: 0, required: false },
    blockUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserDetail", required: false }],
    country: { type: String, required: false },
    favCategoryList: [{ type: String, required: true }],
    fansCount: { type: Number, default: 0, required: false },
    followBrand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    followerCount: { type: Number, default: 0, required: false },
    followingCount: { type: Number, default: 0, required: false },
    friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserDetail", required: false }],
    gender: { type: String, required: false },
    handle: { type: String, unique: true, required: true },
    header: { type: String, required: false },
    postCount: { type: Number, default: 0, required: false },
    profileName: { type: String, required: false },
    properCoins: { type: Number, default: 0, required: false },
    role: { type: String, enum: ["creator", "fan"], default: "fan", required: false },
    userName: { type: String, required: true },
    status: { type: String, enum: ["ban", "unban"], default: "unban", required: false },
    subsTier: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tier", required: false }],
    subscribeBrand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: false }],
    videoGreeting: { type: Boolean, required: false, default: false }
  },
  {
    timestamps: true,
    minimize: false
  }
)
userDetailSchema.set("toJSON", {
  virtuals: true
})

const UserDetailModel = mongoose.model<UserDetailDocument>("UserDetail", userDetailSchema, "user_details")

export default { UserDetailModel }
