import express from 'express'

import adminController from '../controllers/admin.controller'
const router = express.Router()

router.get('/admin/allUsers', adminController.allUsersPagination)
router.get('/admin/allClub', adminController.allBrandsPagination)
router.get('/admin/banUser/:userId', adminController.banUsersById)
router.get('/admin/getUser/:userId', adminController.getUsersById)
router.get('/admin/getBrand/:clubId', adminController.getBrandsById)
router.get('/admin/getBrandCount', adminController.getBrandsCount)
router.delete('/admin/post/:postId', adminController.deletePostByAdmin)
router.get('/admin/userSearch/:userName', adminController.searchUsersByUsername)
router.put('/admin/featureBrand', adminController.updateFeaturedBrands)
router.get('/admin/featureBrand', adminController.allFeaturedBrands)

export = router;
