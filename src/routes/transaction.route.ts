import express from 'express'

import TransactionController from '../controllers/transaction.controller'

const router = express.Router()

router.post('/users/transactions', TransactionController.createTransaction)
router.get('/users/:userId/transactions',TransactionController.findTransactionById)
router.post('/users/:userId/tip', TransactionController.tipCreator)

export default router
