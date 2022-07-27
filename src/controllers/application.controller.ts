import { Request, Response } from "express"

import ApplicationService from "../services/application.service"

const getApplicationByApplicationId = async (req: Request, res: Response) => {
  try {
    const applicationId: string = req.params.applicationId
    await ApplicationService.findApplicationByApplicationId(applicationId).then((findApplicationByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findApplicationByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getApplicationByAccountId = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.accountId
    await ApplicationService.findApplicationByAccountId(accountId).then((findApplicationByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findApplicationByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const getApplications = async (req: Request, res: Response) => {
  try {
    const payload = req.query
    await ApplicationService.findApplications(payload).then((findApplicationByIdResponse: any) => {
      return res.status(200).send({
        status: true,
        data: findApplicationByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const createApplication = async (req: Request, res: Response) => {
  try {
    const payload: any = req.body
    if (!payload.accountId) {
      throw new Error("Account ID must be provided")
    }
    await ApplicationService.createApplication(payload).then((createApplicationResponse: any) => {
      return res.status(200).send({
        status: true,
        data: createApplicationResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateApplicationById = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const applicationId: any = req.params.applicationId
    await ApplicationService.updateApplicationById(applicationId, payload).then(
      (updateApplicationByIdResponse: any) => {
        console.log("updateApplicationByIdResponse", updateApplicationByIdResponse)
        return res.status(200).send({
          status: true,
          data: updateApplicationByIdResponse
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const deleteApplicationById = async (req: Request, res: Response) => {
  try {
    const applicationId: any = req.params.applicationId
    await ApplicationService.deleteApplicationById(applicationId).then((deleteApplicationByIdResponse: any) => {
      console.log("deleteApplicationByIdResponse", deleteApplicationByIdResponse)
      return res.status(200).send({
        status: true,
        data: deleteApplicationByIdResponse
      })
    })
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

const updateApplicationStatusById = async (req: Request, res: Response) => {
  try {
    const applicationId: any = req.params.applicationId
    const payload: any = req.body
    await ApplicationService.updateApplicationStatusById(applicationId, payload).then(
      (deleteApplicationByIdResponse: any) => {
        return res.status(200).send({
          status: true,
          data: deleteApplicationByIdResponse
        })
      }
    )
  } catch (error: any) {
    return res.status(404).send({
      status: false,
      message: error.message
    })
  }
}

export default {
  getApplicationByApplicationId,
  getApplicationByAccountId,
  getApplications,
  createApplication,
  updateApplicationById,
  deleteApplicationById,
  updateApplicationStatusById
}
