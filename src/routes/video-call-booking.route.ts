import express from 'express'
const router = express.Router()

import videoCallBookingController from '../controllers/video-call-booking.controller'

// Create Video Call Booking
router.post('/videoCallBooking', videoCallBookingController.createVideoCallBooking)

export default router
