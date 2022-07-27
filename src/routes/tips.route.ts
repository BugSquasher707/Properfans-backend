import express from 'express'
const router = express.Router()

import TipsController from '../controllers/tips.controller'

router.post('/createTip', TipsController.createTip)
router.get('/getTip/:postId', TipsController.findTipById)

export default router
