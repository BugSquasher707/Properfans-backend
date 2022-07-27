import { Request, Response } from 'express'

import PropercoinService from '../services/propercoin.service'

const createProperWallet = async (req: Request | any, res: Response) => {
    try {
        const userId = req.params.userId
        const payload :any = {body: req.body, userId}
        await PropercoinService.createProperWallet(payload)
            .then((resp : any) => {
                return res.status(200).send({
                    data: resp
                })
            })
    } catch (error: any) {
        return res.status(error.status | 400).send({
            message: error.message
        })
    }
}

const findUserCoinById = async (req: Request, res: Response) => {
  try {
    const properfansId: any = req.params.userId
    await PropercoinService.findUserCoinById(properfansId).then(
      (findUserCoinByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: findUserCoinByIdResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const updateUserCoinById = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const properfansId: any = req.params.userId
    await PropercoinService.updateUserCoinById(properfansId, payload).then(
      (updateUserCoinByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: updateUserCoinByIdResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const convertProperCoins = async (req: Request, res: Response) => {
  try {
    const coins: any = req.params.coins
    await PropercoinService.convertProperCoins(coins).then(
      (convertProperCoinsResponse: any) => {
        return res.status(200).send({
          status: true,
          data: convertProperCoinsResponse,
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

export default { createProperWallet, findUserCoinById, updateUserCoinById, convertProperCoins }
