import express from 'express'
const router = express.Router()

import commentReport from '../controllers/comment-report.controller'


router.post('/commentReport', commentReport.createCommentReport)


export default router
