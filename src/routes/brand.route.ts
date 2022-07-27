import express from 'express'

import BrandController from '../controllers/brand.controller'
import MediaUploader from '../utilities/mediaUploader'

const router = express.Router()

router.get('/club/:clubId', BrandController.getBrandById)
router.get('/club/myClubs/:userId', BrandController.getMyBrand)
router.post('/club', BrandController.createBrand)
router.put('/club/:clubId', BrandController.updateBrandById)
router.get('/club/searchClubsCommunity/:userId', BrandController.brandCommunitySearchById)
router.get('/club/clubHandleAvailable/:handle', BrandController.brandTagAvailable)

router.put('/club/banner/:clubId', MediaUploader.UploadBanner.single('banner'), BrandController.uploadBrandBannerById)
router.get('/club/filterClubFollowers/:clubId', BrandController.brandFansById)

router.put('/club/avatar/:clubId', MediaUploader.UploadAvatar.single('avatar'), BrandController.uploadBrandAvatarById)

router.get('/club/:clubId/topSubs', BrandController.brandTopSubs)

router.get('/club/:clubHandle/follows', BrandController.getBrandFollows)
// Follow club
router.post('/club/:clubId/follow', BrandController.createBrandFollow)
// Follow Multiple club
router.post('/club/followMany', BrandController.createMultiBrandFollow)

// Unfollow club
router.delete('/club/:clubId/unfollow', BrandController.deleteBrandFollow)

router.get('/club/:clubId/posts', BrandController.getPostsBySubTier)

//  Verify handle
router.get('/club/verifyHandle/:handle', BrandController.verifyBrandByHandle)

//  Club handle
router.get('/club/handle/:handle', BrandController.brandByHandle)

//  Search by Handle
router.get('/club/searchHandle/:handle', BrandController.searchHandleClub)
//  Check User follows club or not
router.get('/club/follower/:clubId/:userId', BrandController.checkClubFollower)
// Club by handle
router.get('/club/handle/:handle', BrandController.brandByHandle)
// Club activity
router.get('/club/activity/:clubId', BrandController.brandActivity)
// Club activity by user
router.get('/club/activityByUser/:clubId/:userId', BrandController.brandActivityByUser)

//  Check User follows club or not
router.get('/club/follower/:clubId/:userId', BrandController.checkClubFollower)

// Club Categories
router.post('/club/categories', BrandController.findBrandByCategory)

export default router
