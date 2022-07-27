import express from 'express'

const router = express.Router()
import GreetingController from '../controllers/greeting-package.controller'


router.post('/greetingPackage', GreetingController.createGreetingPackage)
router.put('/greetingPackage/:packageId',GreetingController.updatGreetingPackageById)
router.get('/greetingPackage/:packageId',GreetingController.getGreetingPackageById)
router.delete('/greetingPackage/:packageId',GreetingController.deleteGreetingPackageById)

export default router
