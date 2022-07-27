import express from 'express'
const router = express.Router()

import HashTagsController from '../controllers/hash-tags.controller'

router.post('/hashTags', HashTagsController.createGreetingPackage)
router.get('/hashTags', HashTagsController.getAllHashTags)
router.put('/hashTags/:hashTagId', HashTagsController.updatHashTags)
router.delete('/hashTags/:hashTagId', HashTagsController.deleteHashTags)

//Search HashTags
router.get('/hashTags/search/:hashTag', HashTagsController.searchHashTags)

export default router
