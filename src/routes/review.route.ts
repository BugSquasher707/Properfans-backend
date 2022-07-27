import express from 'express'
const router = express.Router()

import ReviewController from '../controllers/reviews.controller'


router.post('/reviews/:greetingId',ReviewController.createReviewsById)
router.get('/reviews/:greetingId',ReviewController.findReviewById)
router.delete('/reviews/:greetingId/:reviewId', ReviewController.deleteReviewById)

export default router
