import { Request, Response } from "express"
import { toInteger } from "lodash"

import NotificationSettingService from "../services/notification-settings.service"
import UserDetailService from "../services/user-detail.service"
import MediaUploader from "../utilities/mediaUploader"

const createUserDetail = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    await UserDetailService.createUserDetail(payload).then((createUserDetailResponse: any) => {
      NotificationSettingService.createNotificationSetting(createUserDetailResponse.id).then(
        (createNotificationSettingResponse: any) => {
          createUserDetailResponse.notification = createNotificationSettingResponse
          return res.status(200).send({
            status: true,
            data: createUserDetailResponse
          })
        }
      )
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getUserDetailById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.findUserDetailById(userDetailId).then((findUserDetailByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateUserDetailById = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.updateUserDetailById(userDetailId, payload).then((updateUserDetailByIdResponse: any) => {
      console.log("updateUserDetailByIdResponse", updateUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: updateUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deleteUserDetailById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.deleteUserDetailById(userDetailId).then((deleteUserDetailByIdResponse: any) => {
      console.log("deleteUserDetailByIdResponse", deleteUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: deleteUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const uploadProfilePicture = async (req: Request | any, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    const result: any = await MediaUploader.UploadMediaToAWS(req.file)
    const media = result.Location
    const payload: any = { avatar: media }
    await UserDetailService.updateProfilePictureById(userDetailId, payload).then(
      (updateProfilePictureByIdResponse: any) => {
        console.log("updateProfilePictureByIdResponse", updateProfilePictureByIdResponse)
        return res.status(200).send({
          status: true,
          data: updateProfilePictureByIdResponse
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.deleteProfilePictureById(userDetailId).then((deleteUserDetailByIdResponse: any) => {
      console.log("deleteUserDetailByIdResponse", deleteUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: deleteUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const uploadProfileBanner = async (req: Request | any, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    // const filename: any = req?.file?.filename;
    const result: any = await MediaUploader.UploadMediaToAWS(req.file)
    const media = result.Location

    const payload: any = { banner: media }

    await UserDetailService.updateProfileBannerById(userDetailId, payload).then(
      (updateProfilePictureByIdResponse: any) => {
        console.log("updateProfilePictureByIdResponse", updateProfilePictureByIdResponse)
        return res.status(200).send({
          status: true,
          data: updateProfilePictureByIdResponse
        })
      }
    )
  } catch (error: any) {
    console.log(error)

    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deleteProfileBanner = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.deleteProfileBannerById(userDetailId).then((deleteProfileBannerResponse: any) => {
      console.log("deleteProfileBannerResponse", deleteProfileBannerResponse)
      return res.status(200).send({
        status: true,
        data: deleteProfileBannerResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getProfilePictureById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.findUserDetailById(userDetailId).then((findUserDetailByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findUserDetailByIdResponse.avatar
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getUserSecurityById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId

    // TODO: implement
    console.log(userDetailId)
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateUserSecurityById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId

    // TODO: implement
    console.log(userDetailId)
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const searchThroughFriendById = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    const username: any = req.query.username
    const payload: any = { userId, username }

    await UserDetailService.searchThroughFriendById(payload).then((searchThroughFriendByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: searchThroughFriendByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const isCreator = async (req: Request, res: Response) => {
  try {
    const query = req.params.userDetailId
    await UserDetailService.isCreator(query).then((isCreatorResponse: any) => {
      return res.status(200).send({
        status: isCreatorResponse.length ? true : false
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const searchUserDetailByQuery = async (req: Request, res: Response) => {
  try {
    const query = req.params.query
    await UserDetailService.searchUserDetailByQuery(query).then((updateUserDetailByIdResponse: any) => {
      console.log("updateUserDetailByIdResponse", updateUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: updateUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const filterUserDetailByRange = async (req: Request, res: Response) => {
  try {
    const max = req.params.max
    const min = req.params.min
    await UserDetailService.filterUserDetailByRange(toInteger(max), toInteger(min)).then(
      (updateUserDetailByIdResponse: any) => {
        console.log("updateUserDetailByIdResponse", updateUserDetailByIdResponse)
        return res.status(200).send({
          status: true,
          data: updateUserDetailByIdResponse
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const filterUserDetailByRegion = async (req: Request, res: Response) => {
  try {
    const region = req.params.region
    await UserDetailService.filterUserDetailByRegion(region).then((updateUserDetailByIdResponse: any) => {
      console.log("updateUserDetailByIdResponse", updateUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: updateUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const blockUserById = async (req: Request, res: Response) => {
  try {
    const payload: any = req.body.blockUserId
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.blockUserById(userDetailId, payload).then((blockUserByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: blockUserByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const unBlockUserById = async (req: Request, res: Response) => {
  try {
    const payload: any = req.body.unBlockUserId
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.unBlockUserById(userDetailId, payload).then((unBlockUserByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: unBlockUserByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const blockListById = async (req: Request, res: Response) => {
  try {
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.blockListById(userDetailId).then((blockListByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: blockListByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const tipCreator = async (req: Request, res: Response) => {
  try {
    const payload: any = req.body
    await UserDetailService.tipCreator(payload).then((tipCreatorResponse: any) => {
      return res.status(200).send({
        status: true,
        data: tipCreatorResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const verifyUserByHandle = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle
    await UserDetailService.verifyUserByHandle(handle).then((verifyUserByHandle: any) => {
      return res.status(200).send({
        status: true,
        available: !verifyUserByHandle
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const verifyUserByUsername = async (req: Request, res: Response) => {
  try {
    const username: any = req.params.username
    await UserDetailService.verifyUserByUsername(username).then((verifyUserByUsername: any) => {
      return res.status(200).send({
        status: true,
        available: !verifyUserByUsername
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const countUserCreator = async (req: Request, res: Response) => {
  try {
    await UserDetailService.countUserCreator().then((countUserCreatorResp: any) => {
      return res.status(200).send({
        status: true,
        count: countUserCreatorResp
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const properFanVerification = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    await UserDetailService.properFanVerification(userId).then((properFanVerificationResp: any) => {
      return res.status(200).send({
        status: properFanVerificationResp === null ? false : true,
        data: properFanVerificationResp
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const creatorByCategories = async (req: Request, res: Response) => {
  try {
    const categoriesList = req.body.categoriesList
    await UserDetailService.creatorByCategories(categoriesList).then((creatorByCategoriesResp: any) => {
      return res.status(200).send({
        status: true,
        data: creatorByCategoriesResp
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getUserDetailByHandle = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle
    await UserDetailService.findUserDetailByHandle(handle).then((findUserDetailByHandleResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findUserDetailByHandleResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateUserDetailRoleById = async (req: Request, res: Response) => {
  try {
    const payload = { role: req.params.role }
    const userDetailId: any = req.params.userDetailId
    await UserDetailService.updateUserDetailById(userDetailId, payload).then((updateUserDetailByIdResponse: any) => {
      console.log("updateUserDetailByIdResponse", updateUserDetailByIdResponse)
      return res.status(200).send({
        status: true,
        data: updateUserDetailByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const searchUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username
      await UserDetailService.searchUser(username).then((searchUserResponse: any) => {
        return res.status(200).send({
          status: true,
          data: searchUserResponse
        })
      })
  } catch (error: any) {
      return res.status(404).send({
          status: false,
          message: error.message
      })
  }
}

export default {
  getUserDetailById,
  createUserDetail,
  updateUserDetailById,
  deleteUserDetailById,
  uploadProfilePicture,
  deleteProfilePicture,
  uploadProfileBanner,
  deleteProfileBanner,
  getProfilePictureById,
  getUserSecurityById,
  blockUserById,
  unBlockUserById,
  blockListById,
  searchThroughFriendById,
  updateUserSecurityById,
  tipCreator,
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
  getUserDetailByHandle,
  updateUserDetailRoleById
}
