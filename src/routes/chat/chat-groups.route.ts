import express from 'express'

import ChatGroupController from '../../controllers/chat/chat-group.controller'
const router = express.Router()

// Get all chat groups of a user
router.get('/chat/groups/user/:userId', ChatGroupController.getChatGroupByChatGroupId)

// Get chat group with groupId
router.get('/chat/group/:groupId', ChatGroupController.getChatGroupByAccountId)

// Create Chat Group
router.post('/chat/group', ChatGroupController.createChatGroup)

// Update Chat Group
router.put('/chat/group/:groupId', ChatGroupController.updateChatGroupById)

// Leave Chat Group
router.delete('/chat/group/:groupId', ChatGroupController.deleteChatGroupById)

export = router;
