import { FilterQuery } from "mongoose"

import { TransactionDocument } from "../models/transactions/transaction.interface"
import Transaction from "../models/transactions/transaction.model"
import User from "../models/user-details/user-detail.model"
import properWallet from "../services/propercoin.service"

const createTransaction = async (TransactionData: any) => {
  try {
    const sender = await User.UserDetailModel.exists({ _id: TransactionData.sender })
    const receiver = await User.UserDetailModel.exists({ _id: TransactionData.receiver })
    if (!sender || !receiver) {
      throw { status: 400, message: "There's no user with that userId" }
    }
    const createTransactionResponse = await Transaction.TransactionModel.create(TransactionData)
    if (createTransactionResponse) {
      return createTransactionResponse
    }
    throw new Error(`Sorry some errors occurred while createTransaction`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findTransactionById = async (query: FilterQuery<TransactionDocument>): Promise<TransactionDocument | null> => {
  try {
    const user = await User.UserDetailModel.exists({ _id: query })
    if (!user) {
      throw { status: 400, message: "There's no user with that userId" }
    }
    const findTransactionById: any = await Transaction.TransactionModel.find({
      $or: [{ sender: query }, { receiver: query }]
    })
      .populate({ path: "sender" })
      .populate({ path: "receiver" })
    if (findTransactionById) {
      return findTransactionById
    }
    throw new Error(`findTransactionById details not found`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

//TODO: Needs rollback on insuccess of any operation
const tipCreator = async (creatorId: string, tipperId: string, amount: string) => {
  try {
    const tipperWallet = await properWallet.findUserCoinById(tipperId)
    const creatorWallet = await properWallet.findUserCoinById(creatorId)
    if (creatorWallet.properfansId.role !== "creator") {
      throw { status: 400, message: "This user is not a creator!" }
    }
    return properWallet
      .updateUserCoinById(tipperId, { coins: tipperWallet.coins - parseInt(amount) })
      .then(() => properWallet.updateUserCoinById(creatorId, { coins: creatorWallet.coins + parseInt(amount) }))
      .then(() => createTransaction({ sender: tipperId, receiver: creatorId, amount: amount, type: "tip" }))
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default { createTransaction, findTransactionById, tipCreator }
