import express from 'express'

import StoryController from '../controllers/story.controller'
import MediaUploader from '../utilities/mediaUploader'

const router = express.Router()

router.get('/story', StoryController.getStories)
router.get('/story/:storyId', StoryController.getStoryById)
router.get('/story/my/:handleId', StoryController.getMyStories)
router.post('/story', MediaUploader.UploadBanner.single('media'), StoryController.createStory)

export default router
