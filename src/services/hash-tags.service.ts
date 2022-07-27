import { DocumentDefinition } from "mongoose"

import { HashTagsDocument } from "../models/hashtags/hash-tags.interface"
import Hashtags from "../models/hashtags/hash-tags.model"

const createHashTags = async (payload: DocumentDefinition<HashTagsDocument>) => {
    try {
        const createHashTagsResponse = await Hashtags.hashTagsModel.create(payload)
        if (createHashTagsResponse) {
            return createHashTagsResponse
        }
        throw new Error(`Sorry some errors occurred while creating hashtags`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const getAllHashTags = async () => {
    try {
        const getAllHashTagsResponse = await Hashtags.hashTagsModel.find({})
        if (getAllHashTagsResponse) {
            return getAllHashTagsResponse
        }
        throw new Error(`Sorry some errors occurred while getting hashtags`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const updateHashTags = async (hashTagId: string, payload: DocumentDefinition<HashTagsDocument>) => {
    try {
        const updateHashTagsResponse = await Hashtags.hashTagsModel.findByIdAndUpdate(hashTagId, payload, { new: true, upsert: false, runValidators: true })
        if (updateHashTagsResponse) {
            return updateHashTagsResponse
        }
        throw new Error(`Sorry some errors occurred while updating hashtags`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteHashTags = async (hashTagId: DocumentDefinition<HashTagsDocument>) => {
    try {
        const deleteHashTagsResponse = await Hashtags.hashTagsModel.deleteOne(hashTagId)
        if (deleteHashTagsResponse) {
            return deleteHashTagsResponse
        }
        throw new Error(`Sorry some errors occurred while deleting hashtags`)
    } catch (error: any) {
        throw new Error(error)
    }
}

const searchHashTags = async (hashTag: string): Promise<HashTagsDocument | null> => {
    try {
      const regex = new RegExp(hashTag, "i") // i for case insensitive
      const searchHashTags: any = await Hashtags.hashTagsModel.find({ hashTag: { $regex: regex } })

      if (searchHashTags) {
        return searchHashTags
      }

      throw new Error(`Sorry some errors occurred while searching hashtags`)
    } catch (error: any) {
      throw new Error(error)
    }
}

export default { createHashTags, getAllHashTags, updateHashTags, deleteHashTags, searchHashTags }
