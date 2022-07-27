import express from 'express'
const router = express.Router()

import contentCategoryController from '../controllers/content-categories.controller'
import MediaUploader from '../utilities/mediaUploader'

router.post('/contentCategory', MediaUploader.UploadMedia.single('media'), contentCategoryController.createContentCategories)
router.get('/contentCategories', contentCategoryController.findContentCategories)
router.put('/contentCategory/:contentCategoryId', contentCategoryController.updateContentCategoriesById)
router.delete('/contentCategory/:contentCategoryId', contentCategoryController.deleteContentCategoriesById)

export default router
