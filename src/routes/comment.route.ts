import express from 'express'
const router = express.Router()

import CommentController from '../controllers/comment.controller'

router.post('/comment', CommentController.createComment)
router.get('/comment/:commentId', CommentController.getCommentById)
router.get('/comment/byPost/:postId', CommentController.findCommentsByPostId)
router.put('/comment/:commentId', CommentController.updateCommentById)
router.delete('/comment/:commentId', CommentController.deleteCommentById)

export default router
