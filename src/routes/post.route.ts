import express from 'express'

import PostController from '../controllers/post.controller'
import MediaUploader from '../utilities/mediaUploader'

const router = express.Router()

router.get('/posts/:postId', PostController.getPostById)
router.post('/posts', MediaUploader.UploadMedia.array('media',5), PostController.createPost)
router.put('/posts/:postId', MediaUploader.UploadBanner.single('banner'), PostController.updatePostById)
router.delete('/posts/:postId', PostController.deletePostById)

router.get('/posts/:postId', PostController.getPostById)
router.post('/posts', MediaUploader.UploadMedia.array('media',5), PostController.createPost)
router.put('/posts/:postId', MediaUploader.UploadBanner.single('banner'), PostController.updatePostById)
router.delete('/posts/:postId', PostController.deletePostById)
router.get('/posts/brand/:brandId', PostController.findPostByBrandId)

router.get('/post/paginateComments/:postId', PostController.postCommentPaginate)
router.get('/post/paginateLikes/:postId', PostController.postPropPaginate)

router.get('/post/paginateComments/:postId', PostController.postCommentPaginate)
router.get('/post/paginateLikes/:postId', PostController.postPropPaginate)
router.get('/post/feed/:userId', PostController.postFeedByUserId)
router.post('/post/tierVerify', PostController.posttierVerify)
router.get('/posts/brand/:brandId', PostController.findPostByBrandId)
router.get('/posts/brand/latest/:brandId', PostController.findLatestPostByBrandId)

router.get('/post/like/:postId/:userId', PostController.isLikedByUser)

export default router
