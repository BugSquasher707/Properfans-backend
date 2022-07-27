import { Request, Response } from "express"

import BrandService from "../services/brand.service"
import PostService from "../services/post.service"
import UserDetailService from "../services/user-detail.service"

const allUsersPagination = async (req: Request, res: Response) => {
  try {
    const pageNo: any = req.query.pageNo
    await UserDetailService.allUsersPagination(pageNo).then((findUserDetailByIdResponse: any) => {
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
const allBrandsPagination = async (req: Request, res: Response) => {
  try {
    const pageNo: any = req.query.pageNo
    await BrandService.allBrandsPagination(pageNo).then((allBrandsPaginationResponse: any) => {
      return res.status(200).send({
        status: true,
        data: allBrandsPaginationResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const banUsersById = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    // console.log(userId);

    await UserDetailService.banUsersById(userId).then((findUserDetailByIdResponse: any) => {
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
const getUsersById = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    // console.log(userId);

    await UserDetailService.getUsersById(userId).then((getUsersByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: getUsersByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const getBrandsById = async (req: Request, res: Response) => {
  try {
    const clubId: any = req.params.clubId
    // console.log(clubId);

    await BrandService.getBrandsById(clubId).then((getUsersByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: getUsersByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const getBrandsCount = async (req: Request, res: Response) => {
  try {
    // console.log(brandId);

    await BrandService.getBrandsCount().then((getUsersByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: getUsersByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deletePostByAdmin = async (req: Request, res: Response) => {
  try {
    const postId: any = req.params.postId
    await PostService.deletePostById(postId).then((deletePostByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: deletePostByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const searchUsersByUsername = async (req: Request, res: Response) => {
  try {
    const userName: any = req.params.userName
    await UserDetailService.searchUsersByUsername(userName).then((findUserDetailByIdResponse: any) => {
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
const updateFeaturedBrands = async (req: Request, res: Response) => {
  try {
    const query: any = req.body.query
    await BrandService.updateFeaturedBrands(query).then((findUserDetailByIdResponse: any) => {
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
const allFeaturedBrands = async (req: Request, res: Response) => {
  try {
    const query: any = req.body.query

    // TODO: implement
    console.log(query)

    await BrandService.allFeaturedBrands().then((findUserDetailByIdResponse: any) => {
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

export default {
  allUsersPagination,
  allBrandsPagination,
  banUsersById,
  getUsersById,
  getBrandsById,
  getBrandsCount,
  deletePostByAdmin,
  searchUsersByUsername,
  updateFeaturedBrands,
  allFeaturedBrands
}
