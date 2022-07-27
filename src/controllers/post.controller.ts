import { Request, Response } from "express"

import PostService from "../services/post.service"
import MediaUploader from "../utilities/mediaUploader"

const createPost = async (req: Request | any, res: Response) => {
    try {
        // const media = req.file?.filename ? req.file?.filename : "";
        let media: any[] = []
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index]
            const file: any = await MediaUploader.UploadMediaToAWS(element)
            media.push(file.Location)
        }
        const payload = { ...req.body, urls:media }
        console.log(payload)
        await PostService.createPost(payload).then((createPostResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createPostResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const postId: any = req.params.postId
        const userId: any = req.query.userId
        let payload:any = {postId}
        if (userId) {
            payload = {...payload, userId}
        }

    await PostService.findPostById(payload).then((findPostByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findPostByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const findPostByBrandId = async (req: Request, res: Response) => {

    try {
        const brandId: any = req.params.brandId
        await PostService.findPostByBrandId(brandId).then((findPostByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findPostByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }

}

const updatePostById = async (req: Request | any, res: Response) => {
  try {
    const media = req.file?.filename ? req.file?.filename : ""
    const payload = { ...req.body, media }
    const postId: any = req.params.postId
    await PostService.updatePostById(postId, payload).then((updatePostByIdResponse: any) => {
      console.log("updatePostByIdResponse", updatePostByIdResponse)
      return res.status(200).send({
        status: true,
        data: updatePostByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deletePostById = async (req: Request, res: Response) => {
  try {
    const postId: any = req.params.postId
    await PostService.deletePostById(postId).then((deletePostByIdResponse: any) => {
      console.log("deletePostByIdResponse", deletePostByIdResponse)
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

const postCommentPaginate = async (req: Request, res: Response) => {
    try {
        const postId: any = req.params.postId
        const pageNo: any = Number(req.query.pageNo)
        const queryParams = { pageNo, postId }

        await PostService.postCommentPaginate(queryParams).then((findCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCommentByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const postPropPaginate = async (req: Request, res: Response) => {
    try {
        const postId: any = req.params.postId
        const pageNo: any = Number(req.query.pageNo)
        const queryParams = { pageNo, postId }

        await PostService.postPropsPaginate(queryParams).then((findCommentByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findCommentByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const postFeedByUserId = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    const pageNo: any = Number(req.query.pageNo)
    const queryParams = { pageNo, userId }
    await PostService.postFeedByUserId(queryParams).then((postFeedByUserIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: postFeedByUserIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}
const posttierVerify = async (req: Request, res: Response) => {
  try {
    const userId: any = req.body.userId
    const postId: any = req.body.postId

    const queryParams = { postId, userId }
    await PostService.posttierVerify(queryParams).then((posttierVerifyResponse: any) => {
      return res.status(200).send({
        status: true,
        data: posttierVerifyResponse === null ? false : true
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const findLatestPostByBrandId = async (req: Request, res: Response) => {

  try {
      const brandId: any = req.params.brandId
      await PostService.findLatestPostByBrandId(brandId).then((findPostByIdResponse: any) => {
          return res.status(200).send({
              status: true,
              data: findPostByIdResponse
          })
      })
  } catch (error: any) {
      return res.status(404).send({
          status: false,
          message: error.message
      })
  }
}

const isLikedByUser = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.userId
        const postId: any = req.params.postId
        const payload = { postId, userId }

        await PostService.isLikedByUser(payload).then((isLikedByUserResponse: any) => {
            return res.status(200).send({
                status: true,
                liked: isLikedByUserResponse ? true : false
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
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  postCommentPaginate,
  postPropPaginate,
  postFeedByUserId,
  posttierVerify,
  findPostByBrandId,
  findLatestPostByBrandId,
  isLikedByUser
}
