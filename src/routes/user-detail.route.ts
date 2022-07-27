import express from 'express'
const router = express.Router()

import NotificationSettingController from '../controllers/notification-setting.controller'
import PrivacySettingController from '../controllers/privacy-setting.controller'
import UserDetailController from '../controllers/user-detail.controller'
import MediaUploader from '../utilities/mediaUploader'



router.get('/userDetails/:userDetailId', UserDetailController.getUserDetailById)
router.post('/userDetails', UserDetailController.createUserDetail)
router.put('/userDetails/:userDetailId', UserDetailController.updateUserDetailById)
router.delete('/userDetails/:userDetailId', UserDetailController.deleteUserDetailById)


router.post('/userDetails/me/profilePicture/:userDetailId', MediaUploader.UploadAvatar.single('avatar'), UserDetailController.uploadProfilePicture)
router.delete('/userDetails/me/profilePicture/:userDetailId', UserDetailController.deleteProfilePicture)


router.post('/userDetails/me/profileBanner/:userDetailId', MediaUploader.UploadBanner.single('banner'), UserDetailController.uploadProfileBanner)
router.delete('/userDetails/me/profileBanner/:userDetailId', UserDetailController.deleteProfileBanner)

router.post('/userDetails/me/notification', NotificationSettingController.createNotificationSetting)
router.get('/userDetails/me/notification/:notificationSettingId', NotificationSettingController.getNotificationSettingByUserDetailId)
router.put('/userDetails/me/notification/:notificationSettingId', NotificationSettingController.updateNotificationSettingByUserDetailId)

router.get('/userDetails/me/profilePicture/:userDetailId', UserDetailController.getProfilePictureById)

router.post('/userDetails/me/privacy/:userDetailId', PrivacySettingController.createPrivacySetting)
router.get('/userDetails/me/privacy/:userDetailId', PrivacySettingController.getPrivacySettingByUserDetailId)
router.patch('/userDetails/me/privacy/:userDetailId', PrivacySettingController.updatePrivacySettingByUserDetailId)


router.get('/userDetails/me/security/:userDetailId', UserDetailController.getUserSecurityById)
router.patch('/userDetails/me/security/:userDetailId', UserDetailController.updateUserSecurityById)

router.put('/userDetails/blockUser/:userDetailId', UserDetailController.blockUserById)
router.put('/userDetails/unBlockUser/:userDetailId', UserDetailController.unBlockUserById)
router.get('/userDetails/listBlockUser/:userDetailId', UserDetailController.blockListById)

// Update Role
router.put('/user-details/role/:userDetailId/:role', UserDetailController.updateUserDetailRoleById)






router.get('/userDetails/filterFriend/:userId', UserDetailController.searchThroughFriendById)

// Tip Creator
router.post('/userDetails/tip', UserDetailController.tipCreator)

// isCreator
router.get('/userDetails/isCreator/:userDetailId', UserDetailController.isCreator)
// Search Creator
router.get('/userDetails/creator/:query', UserDetailController.searchUserDetailByQuery)
// Search Region
router.get('/userDetails/filterRegion/:region', UserDetailController.filterUserDetailByRegion)
//  Verify handle
router.get('/userDetails/verifyHandle/:handle', UserDetailController.verifyUserByHandle)
//  Verify username
router.get('/userDetails/verifyUsername/:username', UserDetailController.verifyUserByUsername)
//  Creators Count
router.get('/userDetails/creators/count', UserDetailController.countUserCreator)
//  ProperFans verification
router.get('/userDetails/me/:userId', UserDetailController.properFanVerification)
//  ProperFans verification
router.post('/userDetails/creators/categories', UserDetailController.creatorByCategories)
//  get by handle
router.get('/userDetails/handle/:handle', UserDetailController.getUserDetailByHandle)
//  Search Users by Handle
router.get('/userDetails/searchHandle/:username', UserDetailController.searchUser)

export = router;
