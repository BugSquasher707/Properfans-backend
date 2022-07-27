import { DocumentDefinition } from "mongoose"

import { commentReportDocument } from '../models/comment-report/comment-report.interface'
import commentReport from '../models/comment-report/comment-report.model'
import comment from '../models/comments/comment.model'

const createCommentReport = async (commentReportData: DocumentDefinition<commentReportDocument | any> | any) => {
    try {
        const createCommentResponse = await commentReport.commentReportModel.create(commentReportData)
console.log("commentReportDatacommentId")
console.log(commentReportData.commentId)

        const findcomment: any = await comment.CommentModel.findOne({ _id: commentReportData.commentId })
        console.log(findcomment)

        if(findcomment) {
            findcomment.reports.push(createCommentResponse._id)

            await comment.CommentModel.findByIdAndUpdate(findcomment._id, findcomment, { upsert: false, new: true })
        }
        else{
            throw new Error(`Sorry some errors occurred while creating Comment`)
        }


    } catch (error: any) {
        console.log(error)

        throw new Error(error)
    }
}


export default { createCommentReport }
