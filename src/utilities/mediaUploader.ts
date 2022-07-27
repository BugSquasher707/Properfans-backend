import fs from "fs"
import path from "path"

import multer from "multer"

import config from "../configurations/config"

const S3 = require("aws-sdk/clients/s3")

const storageForAvatar = multer.diskStorage({
  destination: "./public/uploads/avatars",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

const storageForMedia = multer.diskStorage({
  destination: "./public/uploads/media",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

const UploadAvatar = multer({
  storage: storageForAvatar,
  limits: { fileSize: 1000000 }
})

const UploadBanner = multer({
  storage: storageForMedia,
  limits: { fileSize: 1000000 }
})

const UploadVideo = multer({
  storage: storageForMedia,
  limits: { fileSize: 100000000 }
})
const UploadMedia = multer({
  storage: storageForMedia,
  limits: { fileSize: 100000000 }
})

const s3 = new S3({
  accessKeyId: config.aws_parameters.accessKeyId,
  secretAccessKey: config.aws_parameters.secretAccessKey
})

function UploadMediaToAWS(file: any) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: config.aws_parameters.bucket,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

export default { UploadAvatar, UploadBanner, UploadMedia, UploadVideo, UploadMediaToAWS }
