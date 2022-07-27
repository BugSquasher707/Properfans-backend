import express from 'express'
const router = express.Router()

import ProperMeetProfileController from "../controllers/proper-meet-profile.controller"
import MediaUploader from "../utilities/mediaUploader"

router.post('/meet/profile', ProperMeetProfileController.createProperMeetProfile)
router.get('/meet/profile', ProperMeetProfileController.getAllProperMeetProfile)
router.get('/meet/profile/:handle', ProperMeetProfileController.getProperMeetProfileByHandle)
router.put('/meet/profile/avatar/:handle', MediaUploader.UploadAvatar.single('avatar'), ProperMeetProfileController.updateProperMeetProfileAvatarByHandle)
router.put('/meet/profile/banner/:handle', MediaUploader.UploadAvatar.single('banner'), ProperMeetProfileController.updateProperMeetProfileBannerByHandle)

export default router
