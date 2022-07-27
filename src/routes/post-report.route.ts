import express from 'express'
const router = express.Router()

import postReport from '../controllers/post-report.controller'


router.post('/postReport', postReport.createPostReport)


export default router
