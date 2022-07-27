import { DocumentDefinition, FilterQuery } from "mongoose"

import Post from '../models/posts/post.model'
import TipsDocument from '../models/tips/tips.interface'
import Tips from '../models/tips/tips.model'

const createTip = async (tipsDate: DocumentDefinition<TipsDocument | any> | any) => {
    try {
        const createTipsResponse = await Tips.TipsModel.create(tipsDate)
        if (createTipsResponse) {
            let findPost: any = await Post.PostModel.findById(tipsDate.postId)
            let sumOfTips = findPost.tips
            let updatedSum = sumOfTips + tipsDate.coins
            findPost.tips = updatedSum
            await Post.PostModel.findByIdAndUpdate(findPost.id, findPost, { new: true, runValidators: true })
            return createTipsResponse
        }
        throw new Error(`Sorry some errors occurred while sending Tip`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const findTipById = async (query: FilterQuery<TipsDocument>): Promise<TipsDocument | null> => {
    try {
        const findTipById: any = await Tips.TipsModel.find({postId: query}).populate([{path: 'user'},{path: 'postId'}])
        if (findTipById) {
            return findTipById
        }
        throw new Error(`findTipById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default { createTip, findTipById }

