import { Request, Response } from "express"

import BrandService from "../services/brand.service"
import MediaUploader from "../utilities/mediaUploader"

const createBrand = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    await BrandService.createBrand(payload).then((brandCreateResponse: any) => {
      return res.status(200).send({
        status: true,
        data: brandCreateResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getBrandById = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    await BrandService.findBrandById(clubId).then((findBrandByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findBrandByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const getMyBrand = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    await BrandService.findMyBrand(userId).then((findMyBrandResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findMyBrandResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateBrandById = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const clubId: any = req.params.clubId
    await BrandService.updateBrandById(clubId, payload).then((updateBrandByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: updateBrandByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const uploadBrandAvatarById = async (req: Request | any, res: Response) => {
  try {
    if (req.file) {
      const result: any = await MediaUploader.UploadMediaToAWS(req.file)
      const media = result.Location
      const payload = { avatar: media }
      const clubId: any = req.params.clubId
      await BrandService.updateBrandById(clubId, payload).then((updateBrandByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: updateBrandByIdResponse
        })
      })
    } else {
      return res.status(404).send({
        status: false,
        error: "Please upload attachment and must be less than 1 MB"
      })
    }
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const uploadBrandBannerById = async (req: Request | any, res: Response) => {
  try {
    if (req.file) {
      const result: any = await MediaUploader.UploadMediaToAWS(req.file)
      const media = result.Location
      const payload = { banner: media }
      const clubId: any = req.params.clubId
      await BrandService.updateBrandById(clubId, payload).then((updateBrandByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: updateBrandByIdResponse
        })
      })
    } else {
      return res.status(404).send({
        status: false,
        error: "Please upload attachment and must be less than 1 MB"
      })
    }
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const brandCommunitySearchById = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    const handle: any = req.query.handle
    const payload: any = { userId, handle }

    await BrandService.brandCommunitySearchById(payload).then(
      (brandCommunitySearchByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: brandCommunitySearchByIdResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const brandActivity = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    await BrandService.brandActivity(clubId).then((brandFansByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: brandFansByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const brandActivityByUser = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    const userId: any = req.params.userId
    await BrandService.brandActivityByUser({ clubId, userId }).then((brandFansByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: brandFansByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const brandFansById = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    const payload: any = { clubId }

    await BrandService.brandFansById(payload).then(
      (brandFansByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: brandFansByIdResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const brandTagAvailable = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle

    await BrandService.brandTagAvailable(handle).then(
      (brandTagAvailableResponse: any) => {
        return res.status(200).send({
          status: true,
          data: brandTagAvailableResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const brandTopSubs = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId
    const filters = req.query
    return await BrandService.brandTopSubs(clubId, filters).then(
      (data: any) => {
        res.status(200).send({
          data: data,
        })
      }
    )
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message,
    })
  }
}

const createBrandFollow = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId
    const userId = req.body.user
    await BrandService.createBrandFollow(clubId, userId).then((createBrandFollowResponse: any) => {
      return res.status(200).send({
        status: true,
        follower: createBrandFollowResponse
      })
    })
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message
    })
  }
}
const createMultiBrandFollow = async (req: Request, res: Response) => {
  console.log("rrrr")
  try {
    const clubIdArray = req.body.clubIdArray
    const userId = req.body.userId
    await BrandService.createMultiBrandFollow({ clubIdArray, userId }).then((createMultiBrandFollowResponse) => {
      return res.status(200).send({
        status: true,
        follower: createMultiBrandFollowResponse,
      })
    })
  } catch (error: any) {


    return res.status(error.status | 400).send({
      message: error.message,
    })
  }
}




const deleteBrandFollow = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId
    const userId = req.body.user

    await BrandService.deleteBrandFollow(clubId, userId).then((deleteBrandFollowResponse: any) => {
      return res.status(200).send({
        status: true,
        follower: deleteBrandFollowResponse
      })
    })
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message
    })
  }
}

const getBrandFollows = async (req: Request, res: Response) => {
  try {
    const clubHandle = req.params.clubHandle
    const filters = req.query
    await BrandService.getBrandFollows(clubHandle, filters).then(
      (data: any) => {
        return res.status(200).send({
          data: data,
        })
      }
    )
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message,
    })
  }
}

const getPostsBySubTier = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId
    const userId = req.body.userId
    const filters = req.query
    return await BrandService.getPostsBySubTier(clubId, userId, filters).then(
      (data: any) => {
        return res.status(200).send({
          data: data,
        })
      }
    )
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message,
    })
  }
}

const brandByHandle = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle
    await BrandService.verifyBrandByHandle(handle).then(
      (brandByHandle: any) => {
        return res.status(200).send({
          status: true,
          data: brandByHandle,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}
const verifyBrandByHandle = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle
    await BrandService.verifyBrandByHandle(handle).then(
      (verifyBrandByHandle: any) => {
        return res.status(200).send({
          status: true,
          available: verifyBrandByHandle === null ? true : false,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}
const searchHandleClub = async (req: Request, res: Response) => {
  try {
    const handle: any = req.params.handle
    await BrandService.searchHandleClub(handle).then(
      (searchHandleClub: any) => {
        return res.status(200).send({
          status: true,
          data: searchHandleClub,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const checkClubFollower = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    const userId: any = req.params.userId

    await BrandService.checkClubFollower(clubId, userId).then((checkClubFollowerResponse: any) => {
      return res.status(200).send({
        status: true,
        follower: checkClubFollowerResponse ? true : false
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const findBrandByCategory = async (req: Request, res: Response) => {
  try {
    const payload = req.body.categoriesList

    await BrandService.findBrandByCategory(payload).then((findBrandByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findBrandByIdResponse
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
  getBrandById, getMyBrand, createBrand, updateBrandById, uploadBrandAvatarById, uploadBrandBannerById, brandTagAvailable, createBrandFollow, brandFansById, brandTopSubs, deleteBrandFollow, getBrandFollows, brandCommunitySearchById, getPostsBySubTier, verifyBrandByHandle, searchHandleClub, checkClubFollower, createMultiBrandFollow, brandByHandle, brandActivity, brandActivityByUser, findBrandByCategory
}
