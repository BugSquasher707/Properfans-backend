import express from 'express'
const router = express.Router()

import PropController from '../controllers/prop.controller'
/* Deprecated by Sharnam J on 25/7/2022 & replaced by /post/react/:reaction/:postId */
//router.put('/prop/addPost/:postId', PropController.createPostProp)
//router.put('/prop/removePost/:postId', PropController.deletePostProp)
router.post('/post/react/:reaction/:postId', PropController.reactPost)

/* Deprecated by Sharnam J on 25/7/2022 & replaced by /comment/react/:reaction/:commentId */
//router.put('/prop/addComment/:commentId', PropController.createCommentProp)
//router.put('/prop/removeComment/:commentId', PropController.deleteCommentProp)
router.post('/comment/react/:reaction/:commentId', PropController.reactComment)

export default router
