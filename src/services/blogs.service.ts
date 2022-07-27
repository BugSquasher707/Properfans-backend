import { DocumentDefinition } from "mongoose"

import { BlogDocument } from '../models/blogs/blog.interface'
import Blog from '../models/blogs/blog.model'

const createBlog = async (payload: DocumentDefinition<BlogDocument | any>) => {
    try {
        const createBlogResponse: any = await Blog.create(payload)
        return createBlogResponse
    } catch (error: any) {
        throw new Error(error)
    }
}

const getBlogPaginate = async (payload: DocumentDefinition<BlogDocument | any>) => {
    try {
        const findBlogPaginate: any = await Blog.find().limit(10).skip(10 * (payload.pageNo - 1)).populate({
            path: "userId",
        })
        if (findBlogPaginate) {
            return findBlogPaginate
        }
        throw new Error(`Blog details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}


const getBlogCount = async (payload: DocumentDefinition<BlogDocument | any>) => {
    try {
        const findBlogPaginate: any = await Blog.find(payload).count()
        if (findBlogPaginate) {
            return findBlogPaginate
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const findBlogByPermalink = async (payload: DocumentDefinition<BlogDocument | any>) => {
    try {
        const getBlogResponse: any = await Blog.find(payload).populate({
            path: "userId",
        })
        return getBlogResponse
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { createBlog, getBlogPaginate, findBlogByPermalink, getBlogCount}
