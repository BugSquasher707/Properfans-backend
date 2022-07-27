import mongoose, { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

import { ApplicationDocument } from "../models/applications/application.interface"
import Application from "../models/applications/application.model"

const findApplicationByApplicationId = async (applicationId: string): Promise<ApplicationDocument | null> => {
  try {
    const findApplicationById: any = await Application.ApplicationModel.findOne({ _id: applicationId })
    if (findApplicationById) {
      return findApplicationById
    }
    throw new Error(`Error retrieving this Application`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findApplicationByAccountId = async (accountId: string): Promise<ApplicationDocument | null> => {
  try {
    const findApplicationByAccountId: any = await Application.ApplicationModel.findOne({
      accountId: accountId,
      applicationType: "become-creator"
    })
    if (findApplicationByAccountId) {
      return findApplicationByAccountId
    }
    throw new Error(`Error retrieving Application for this account`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const findApplications = async (payload: FilterQuery<ApplicationDocument>): Promise<ApplicationDocument | null> => {
  try {
    const findApplications: any = await Application.ApplicationModel.find(payload)
    if (findApplications) {
      return findApplications
    }
    throw new Error(`Error retrieving Applications`)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const createApplication = async (application: DocumentDefinition<ApplicationDocument>) => {
  try {
    const createApplicationResponse = await Application.ApplicationModel.create(application)
    if (createApplicationResponse) {
      return createApplicationResponse
    }
    throw new Error(`Creating application failed.`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const updateApplicationById = async (
  applicationId: string,
  payload: UpdateQuery<ApplicationDocument>
): Promise<ApplicationDocument | null> => {
  try {
    const updateApplicationByIdResponse: any = await Application.ApplicationModel.findByIdAndUpdate(
      applicationId,
      payload,
      { upsert: false, new: true }
    )
    if (updateApplicationByIdResponse) {
      return updateApplicationByIdResponse
    }
    throw new Error(`Updating application failed.`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const deleteApplicationById = async (applicationId: string): Promise<ApplicationDocument | null> => {
  try {
    const deleteApplicationByIdResponse: any = await Application.ApplicationModel.deleteOne({ _id: applicationId })
    if (deleteApplicationByIdResponse) {
      return deleteApplicationByIdResponse
    }
    throw new Error(`Deleting application failed.`)
  } catch (error: any) {
    throw new Error(error)
  }
}
const updateApplicationStatusById = async (
  applicationId: string,
  payload: UpdateQuery<ApplicationDocument>
): Promise<ApplicationDocument | null> => {
  try {
    const updateApplicationStatusById: any = await Application.ApplicationModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(applicationId),
      payload,
      { upsert: false, new: true }
    )
    if (updateApplicationStatusById) {
      return updateApplicationStatusById
    }
    throw new Error(`Updating application failed.`)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  findApplicationByApplicationId,
  findApplicationByAccountId,
  findApplications,
  createApplication,
  updateApplicationById,
  deleteApplicationById,
  updateApplicationStatusById
}
