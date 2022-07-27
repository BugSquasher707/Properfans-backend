import express from 'express'

import FollowerController from '../controllers/follower.controller'

const router = express.Router()
router.get('/brand/followers/:clubId', FollowerController.brandPaginateFollowers)
router.get('/brand/latestFollowers/:clubId', FollowerController.latestFollowersByBrand)

export default router
