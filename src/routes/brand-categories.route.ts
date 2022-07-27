import express from 'express'
const router = express.Router()

import brandCategoryController from '../controllers/brand-categories.controller'

router.post('/brand-category', brandCategoryController.createBrandCategories)
router.get('/brand-category/:brandCategoryId', brandCategoryController.findBrandCategoriesById)
router.put('/brand-category/:brandCategoryId', brandCategoryController.updateBrandCategoriesById)
router.delete('/brand-category/:brandCategoryId', brandCategoryController.deleteBrandCategoriesById)

export default router
