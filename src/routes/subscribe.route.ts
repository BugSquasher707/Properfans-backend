import express from 'express'
const router = express.Router()

import { createSubscribe } from "../controllers/subscribe.controller"

router.put('/subscribe/update/:userId', createSubscribe)
// router.put('/subscribe/removePost/:postId', deleteSubscribe)

export default router
