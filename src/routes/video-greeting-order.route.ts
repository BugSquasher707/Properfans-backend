import express from 'express'
const router = express.Router()

import videoGreetingOrdersController from '../controllers/video-greeting-orders.controller'
import MediaUploader from '../utilities/mediaUploader'

router.post('/videoGreetingOrder', videoGreetingOrdersController.createVideoGreetingOrders)

// Get Video Greeting Orders by userId
router.get('/videoGreetingOrder/user/:userId', videoGreetingOrdersController.findVideoGreetingOrdersByUserId)

// Get Video Greeting Orders by creatorId
router.get('/videoGreetingOrder/creator/:creatorId', videoGreetingOrdersController.findVideoGreetingOrdersByCreatorId)

// Get Video Greeting Orders by creatorId and date
router.get('/videoGreetingOrder/date/:creatorId/:date', videoGreetingOrdersController.findVideoGreetingOrdersByDate)

router.put('/videoGreetingOrder/:videoGreetingOrdersId', videoGreetingOrdersController.updateVideoGreetingOrdersById)

// Deliver Video Greeting Order
router.put('/videoGreetingOrder/deliver/:videoGreetingOrdersId', MediaUploader.UploadVideo.single('media'), videoGreetingOrdersController.deliveryVideoGreetingOrder)

export default router
