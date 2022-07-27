import { Request, Response } from 'express'

import PostReportService from '../services/post-report.service'

const createPostReport = async (req: Request | any, res: Response) => {
    try {
        // const media = req.file?.filename ? req.file?.filename : "";
        const payload = { ...req.body }

        await PostReportService.createPostReport(payload).then((createPostReportResponse: any) => {
            return res.status(200).send({
                status: true,
                data: createPostReportResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default {createPostReport}
