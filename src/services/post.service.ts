import { FilterQuery, UpdateQuery } from "mongoose"

import { PostDocument } from "../models/posts/post.interface"
import Post from "../models/posts/post.model"
import User from "../models/user-details/user-detail.model"

const createPost = async (postDate: any) => {
  try {
    const createPostResponse = await Post.PostModel.create(postDate)
    if (createPostResponse) {
      return createPostResponse
    }
    throw new Error(`Sorry some errors occurred while createPostResponse`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const findPostById = async (query: FilterQuery<PostDocument>): Promise<PostDocument | null> => {
  try {
    let findPostById: any = await Post.PostModel.findOne({ _id: query.postId }).populate([
      {
        path: "brand",
        populate: {
          path: "owner"
        }
      },
      {
        path: "comments",
        options: {
          sort: {
            createdAt: -1
          }
        }
      },
      {
        path: "likes"
      },
      {
        path: "user"
      }
    ])
    if (query.userId) {
      const likeVerify: any = await Post.PostModel.findOne({ _id: query.postId, likes: { $in: [query.userId] } })
      if (likeVerify) {
        findPostById = { ...findPostById._doc, liked: true, id: findPostById._id }
      } else {
        findPostById = { ...findPostById._doc, liked: false, id: findPostById._id }
      }
    }
    if (findPostById) {
      return findPostById
    }

    throw new Error(`findPostById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updatePostById = async (postId: string, payload: UpdateQuery<PostDocument>): Promise<PostDocument | null> => {
  try {
    const updatePostByIdResponse: any = await Post.PostModel.findByIdAndUpdate(postId, payload, {
      upsert: false,
      new: true
    })
      .populate({
        path: "brand"
      })
      .populate({
        path: "user"
      })
      .populate({
        path: "likes"
      })
      .populate({
        path: "comments"
      })
    if (updatePostByIdResponse) {
      return updatePostByIdResponse
    }
    throw new Error(`updatePostByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const deletePostById = async (postId: string): Promise<PostDocument | null> => {
  try {
    const deletePostByIdResponse: any = await Post.PostModel.deleteOne({ _id: postId })
    if (deletePostByIdResponse) {
      return deletePostByIdResponse
    }
    throw new Error(`deletePostByIdResponse not found`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const postCommentPaginate = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
  try {
    const findPostComment: any = await Post.PostModel.findOne({ _id: query.postId }).populate({
      path: "comments"
    })
    if (findPostComment) {
      if (query.pageNo === 0 || !query.pageNo || query.pageNo === 1) {
        const pagination = findPostComment?.comments.slice(0, 10)
        return pagination
      } else {
        const pagination = findPostComment?.comments.slice((query.pageNo - 1) * 10, query.pageNo * 10)
        return pagination
      }
    }
    throw new Error(`findCommentById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const postPropsPaginate = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
  try {
    const findPostProps: any = await Post.PostModel.findOne({ _id: query.postId }).populate({
      path: "props"
    })

    if (findPostProps) {
      if (query.pageNo === 0 || !query.pageNo || query.pageNo === 1) {
        const pagination = findPostProps?.props.slice(0, 10)
        return pagination
      } else {
        const pagination = findPostProps?.props.slice((query.pageNo - 1) * 10, query.pageNo * 10)
        return pagination
      }
    }
    throw new Error(`findCommentById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const postFeedByUserId = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
  try {
    const user: any = await User.UserDetailModel.findOne({ _id: query.userId })
    const findPostProps: any = await Post.PostModel.find({ brand: { $in: user.followBrand } })
      .populate({
        path: "brand"
      })
      .populate({
        path: "user"
      })
      .populate({
        path: "likes"
      })
      .populate({
        path: "comments"
      })

    if (findPostProps) {
      if (query.pageNo === 0 || !query.pageNo || query.pageNo === 1) {
        const pagination = findPostProps?.slice(0, 10)
        return pagination
      } else {
        const pagination = findPostProps?.slice((query.pageNo - 1) * 10, query.pageNo * 10)
        return pagination
      }
    }
    throw new Error(`findCommentById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const posttierVerify = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
  try {
    const findPost: any = await Post.PostModel.findOne({ _id: query.postId })
    const user: any = await User.UserDetailModel.findOne({ _id: query.userId, subsTier: { $in: [findPost.tierId] } })
    console.log(user)

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
const findPostByBrandId = async (query: FilterQuery<PostDocument>): Promise<PostDocument | null> => {
    try {
        const findPostById: any = await Post.PostModel.find({brand: query })
        .populate({
            path: 'brand'
        })
        .populate({
            path: 'user'
        })
        .populate({
            path: 'likes'
        })
        .populate({
            path: 'comments'
        })

        if (findPostById) {
            return findPostById
        }
        throw new Error(`findPostById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const findLatestPostByBrandId = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
    try {
        const findPostById: any = await Post.PostModel.findOne({brand: query }).sort({createdAt:-1})
        .populate({
            path: 'brand'
        })
        .populate({
            path: 'user'
        })
        .populate({
            path: 'likes'
        })
        .populate({
            path: 'comments'
        })

        if (findPostById) {
            return findPostById
        }
        throw new Error(`findPostById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const isLikedByUser = async (query: FilterQuery<PostDocument>): Promise<PostDocument | any> => {
  try {
      const likeVerify: any = await Post.PostModel.findOne({ _id: query.postId, likes:{ $in: [query.userId] } })

      if(likeVerify) {
          return likeVerify
      }

  } catch (error: any) {
      throw new Error(error.message)
  }
}

export default {
  findPostById,
  createPost,
  updatePostById,
  deletePostById,
  postCommentPaginate,
  postPropsPaginate,
  postFeedByUserId,
  posttierVerify,
  findPostByBrandId,
  findLatestPostByBrandId,
  isLikedByUser
}
