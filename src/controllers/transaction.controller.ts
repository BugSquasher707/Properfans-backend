import { Request, Response } from "express"

import transactionService from "../services/transaction.service"

const createTransaction = async (req: Request, res: Response) => {
    try {
      const payload = req.body
      await transactionService.createTransaction(payload).then((createTransactionResponse: any) => {
        return res.status(200).send({
          status: true,
          data: createTransactionResponse,
        })
      })
    } catch (error: any) {
      return res.status(error.status | 400).send({
        status: false,
        message: error.message,
      })
    }
  }

  const findTransactionById = async (req: Request | any, res: Response) => {

    try {
        const userId: any = req.params.userId
        await transactionService.findTransactionById(userId).then((findTransactionByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findTransactionByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(error.status | 400).send({
            status: false,
            message: error.message
        })
    }
}

const tipCreator = async (req: Request, res: Response) => {
  try {
    const creator: string = req.params.userId
    const tipper: string = req.body.userId
    const amount: string = req.body.amount
    await transactionService.tipCreator(creator, tipper, amount)
      .then((transaction: any) => {
        return res.status(200).send({
          data: transaction
        })
      })
  } catch (error: any) {
    return res.status(error.status | 400).send({
      message: error.message
    })
  }
}

export default { createTransaction, findTransactionById, tipCreator }
