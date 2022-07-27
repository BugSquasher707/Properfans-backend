import { DocumentDefinition } from "mongoose"

import { postReportDocument } from '../models/post-report/post-report.interface'
import postReport from '../models/post-report/post-report.model'
import Post from '../models/posts/post.model'

const createPostReport = async (postReportData: DocumentDefinition<postReportDocument | any> | any) => {
    try {
        const createCommentResponse = await postReport.postReportModel.create(postReportData)

        const findPost: any = await Post.PostModel.findOne({ _id: postReportData.postId })

        if(findPost) {
            findPost.reports.push(createCommentResponse._id)

            await Post.PostModel.findByIdAndUpdate(findPost._id, findPost, { upsert: false, new: true })
        }
        else{
            throw new Error(`Sorry some errors occurred while creating Comment`)
        }


    } catch (error: any) {
        throw new Error(error)
    }
}


export default { createPostReport }
