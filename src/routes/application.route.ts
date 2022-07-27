import express from "express"

import ApplicationController from "../controllers/application.controller"
const router = express.Router()

// Get Application with applicationId
router.get(
  "/applications/becomeCreator/application/:applicationId",
  ApplicationController.getApplicationByApplicationId
)

// Get Application with accountId
router.get("/applications/becomeCreator/account/:accountId", ApplicationController.getApplicationByAccountId)

// Get Many applications based on query parameters
router.get("/applications/search", ApplicationController.getApplications)

// Create Application
router.post("/applications/becomeCreator", ApplicationController.createApplication)

// Update Application
router.put("/applications/becomeCreator/application/:applicationId", ApplicationController.updateApplicationById)

// Delete Application
router.delete("/applications/becomeCreator/application/:applicationId", ApplicationController.deleteApplicationById)

// Update Application Status
router.put("/applications/status/:applicationId", ApplicationController.updateApplicationStatusById)

export = router
