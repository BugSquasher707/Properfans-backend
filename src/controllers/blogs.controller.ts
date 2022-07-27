import { Request, Response } from 'express'

import BlogService from '../services/blogs.service'
import MediaUploader from "../utilities/mediaUploader"

const createBlogs = async (req: Request, res: Response) => {
    try {
        let authData: any = req.user
        let userId = authData.userId

        const payload = req.body
        payload.status = "Active"
        payload.userId = userId

        if (payload.body) {
            const wpm = 130
            const words = payload.body.trim().split(/\s+/).length
            const time = Math.ceil(words / wpm)
            payload.readTime = `${time}m`
        }

        if (payload.title) {
            let tilteTemp = payload.title.toLowerCase().replace(/ /g, "-")
            // let categoryTemp = payload.category.toLowerCase().replace(/ /g, "-")
            //payload.permalink = `${categoryTemp}/${tilteTemp}`
            payload.permalink = `${tilteTemp}`
            let getBlogCount = await BlogService.getBlogCount({ title: payload.title })
            if (getBlogCount) {
                payload.permalink = `${tilteTemp}-${getBlogCount}`
            }
        }

        //console.log((req.files.length)
        let media: any[] = []
        let files: any = req.files
        for (let index = 0; index < files.length; index++) {
            const element = files[index]
            const file: any = await MediaUploader.UploadMediaToAWS(element)
            media.push(file.Location)
        }
        payload.media = media

        await BlogService.createBlog(payload).then((createBlogResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createBlogResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const findBlogPermalink = async (req: Request, res: Response) => {
    try {
        const payload = req.params
        await BlogService.findBlogByPermalink(payload).then((blogResponse: any) => {
            return res.status(200).send({
                status: true,
                data: blogResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getAllBlog = async (req: Request, res: Response) => {
    try {
        const pageNo: any = Number(req.query.pageNo)
        const payload = { pageNo: pageNo }
        await BlogService.getBlogPaginate(payload).then((blogResponse: any) => {
            return res.status(200).send({
                status: true,
                data: blogResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createBlogs, findBlogPermalink, getAllBlog }
