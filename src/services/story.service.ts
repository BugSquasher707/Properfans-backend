import { DocumentDefinition, FilterQuery } from "mongoose"

import { StoryDocument } from "../models/stories/story.interface"
import Story from "../models/stories/story.model"

const findMyStories = async (query: FilterQuery<StoryDocument | any>): Promise<StoryDocument | any> => {
    try {
        const findMyStories: any = await Story.StoryModel.find({ handle: query }).populate({
            path: "brandId"
        })
        if (findMyStories) {
            return findMyStories
        }
        throw new Error(`findMyStories details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findStories = async () => {
    try {
        const findStories: any = await Story.StoryModel.find({}).populate({
            path: "brandId"
        })
        if (findStories) {
            return findStories
        }
        throw new Error(`findStories details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findStoryById = async (query: FilterQuery<StoryDocument | any>): Promise<StoryDocument | any> => {
    try {
        const findStoryById: any = await Story.StoryModel.findOne({ _id: query }).populate({
            path: "brandId"
        })
        if (findStoryById) {
            return findStoryById
        }
        throw new Error(`findStoryById details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const createStory = async (storyDate: DocumentDefinition<StoryDocument>) => {
    try {
        const createStoryResponse = await Story.StoryModel.create(storyDate)
        if (createStoryResponse) {
            return createStoryResponse
        }
        throw new Error(`Sorry some errors occurred while createStoryResponse`)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { findMyStories, findStories, findStoryById, createStory }
