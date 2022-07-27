
import * as dotenv from "dotenv"
dotenv.config()

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""
const MONGO_HOST = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ellingsenx"

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url:
    MONGO_USERNAME !== "" && MONGO_PASSWORD !== ""
      ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
      : `${MONGO_HOST}`
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 4000

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
}

const API = {
  prefix: process.env.API_PREFIX || "/api/v1"
}

const REDIS_ENABLE = process.env.REDIS_ENABLE?.toLowerCase().trim() === "true" ? true : false
const REDIS_HOST = process.env.REDIS_HOST || "localhost"
const REDIS_PORT = process.env.REDIS_PORT ? Number.parseInt(process.env.REDIS_PORT) : 6379

const TOKEN_ISSUER = process.env.TOKEN_ISSUER || ""

const config = {
  mongo: MONGO,
  server: SERVER,
  api: API,
  aws_parameters: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucket: process.env.BUCKET
  },
  redis: {
    enable: REDIS_ENABLE,
    host: REDIS_HOST,
    port: REDIS_PORT
  },
  TOKEN_ISSUER
}

export default config
