import express from 'express'
const router = express.Router()

import videoSlotController from '../controllers/video-slot.controller'

// Create Video Call Slot
router.post('/videoSlot', videoSlotController.createVideoSlot)

// Get Video Call Slots by creatorId
router.get('/videoSlot/creator/:creatorId', videoSlotController.findVideoSlotByCreatorId)

export default router
