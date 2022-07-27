import { Request, Response } from 'express'

import CommentReportService from '../services/comment-report.service'

const createCommentReport = async (req: Request | any, res: Response) => {
    try {
        // const media = req.file?.filename ? req.file?.filename : "";
        const payload = { ...req.body }

        await CommentReportService.createCommentReport(payload).then((createCommentReportResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createCommentReportResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default {createCommentReport}
