import { Request, Response } from "express"

import StoryService from "../services/story.service"
import MediaUploader from "../utilities/mediaUploader"

const getStories = async (req: Request, res: Response) => {
  try {
    await StoryService.findStories().then((findStoryByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findStoryByIdResponse,
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

const getStoryById = async (req: Request, res: Response) => {
  try {
    const storyId: any = req.params.storyId
    await StoryService.findStoryById(storyId).then(
      (findStoryByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: findStoryByIdResponse,
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

const getMyStories = async (req: Request, res: Response) => {
  try {
    const handleId: any = req.params.handleId
    await StoryService.findMyStories(handleId).then(
      (findStoryByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: findStoryByIdResponse,
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

const createStory = async (req: Request | any, res: Response) => {
  try {
    if (req.file) {
      const result: any = await MediaUploader.UploadMediaToAWS(req.file)
      const media = result.Location
      const stories = [{
              created:'',
              url:media,
              type:'',
          }]
      const payload = { ...req.body,stories }
      await StoryService.createStory(payload).then((createStoryResponse: any) => {
          return res.status(200).send({
              status: true,
              data: createStoryResponse
          })
      })
    } else {
      return res.status(404).send({
        status: false,
        error: "Please upload attachment and must be less than 1 MB",
      })
    }
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message,
    })
  }
}

export default { getStories, getStoryById, getMyStories, createStory }
