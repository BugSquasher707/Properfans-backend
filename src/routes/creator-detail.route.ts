import express from 'express'

import CreatorDetailController from '../controllers/creator-detail.controller'

const router = express.Router()

router.get('/creatorDetails/:userId', CreatorDetailController.getCreatorDetailById)
router.post('/creatorDetails/:userId', CreatorDetailController.createCreatorDetail)
router.put('/creatorDetails/:userId', CreatorDetailController.updateCreatorDetailById)
router.delete('/creatorDetails/:userId', CreatorDetailController.deleteCreatorDetailById)
// filter by brand category
router.get('/creatorDetails/filter/brandCategory/:query', CreatorDetailController.filterCreatorDetailByBrandCategory)
// filter by content Catagory
router.get('/creatorDetails/filter/contentCategory/:query', CreatorDetailController.filterCreatorDetailByContentCategory)



export default router
