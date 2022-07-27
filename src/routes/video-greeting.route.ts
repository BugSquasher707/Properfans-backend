import express from 'express'
const router = express.Router()

import videoGreetingController from '../controllers/video-greeting.controller'

router.post('/videoGreeting', videoGreetingController.createvideoGreetings)
router.get('/videoGreeting/:videoGreetingsId', videoGreetingController.findvideoGreetingsById)
router.put('/videoGreeting/:videoGreetingsId', videoGreetingController.updatevideoGreetingsById)
router.delete('/videoGreeting/:videoGreetingsId', videoGreetingController.deleteVideoGreetingsById)

export default router
