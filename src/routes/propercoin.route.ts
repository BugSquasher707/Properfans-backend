import express from 'express'

import PropercoinController from '../controllers/propercoin.controller'

const router = express.Router()

router.post('/properCoin/users/:userId/wallet', PropercoinController.createProperWallet)
router.get('/properCoin/users/:userId/wallet',PropercoinController.findUserCoinById)
router.put('/properCoin/users/:userId/wallet',PropercoinController.updateUserCoinById)
router.get('/properCoin/users/convert/:coins', PropercoinController.convertProperCoins)

export default router
