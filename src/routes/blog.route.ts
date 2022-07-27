
import express from 'express'
const router = express.Router()

import BlogController from '../controllers/blogs.controller'
import auth from "../middleware/auth"
import MediaUploader from '../utilities/mediaUploader'

router.post('/', auth, MediaUploader.UploadMedia.array('media', 5), BlogController.createBlogs)
router.get('/', BlogController.getAllBlog)
router.get('/:permalink', BlogController.findBlogPermalink)

export default router
