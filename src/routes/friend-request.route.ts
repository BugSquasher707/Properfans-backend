import express from 'express'
const router = express.Router()

import FriendRequestController from '../controllers/friend-request.controller'

router.post('/friendRequest/send', FriendRequestController.createRequest)
router.get('/friendRequest/myRequests/:userDetailId', FriendRequestController.getMyRequestById)
router.get('/friendRequest/sentRequests/:userDetailId', FriendRequestController.getSentRequestById)
router.get('/friendRequest/myFriends/:userDetailId', FriendRequestController.getMyFriends)
router.put('/friendRequest/acceptRequest/:requestId', FriendRequestController.acceptRequestById)
router.put('/friendRequest/declineRequest/:requestId', FriendRequestController.declineRequestById)
router.put('/friendRequest/cancelRequest/:requestId', FriendRequestController.cancelRequestById)
router.delete('/friendRequest/remove/:userDetailId/:friendId', FriendRequestController.removeFriendById)
router.get('/friendRequest/areWeFriends/:userDetailId', FriendRequestController.areWeFriendById)
router.get('/friendRequest/Community/:userDetailId', FriendRequestController.friendsCommunityById)

export default router
