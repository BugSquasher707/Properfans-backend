import http from "http"

import { createAdapter } from "@socket.io/redis-adapter"
import bodyParser from "body-parser"
import cors from "cors"
import express, { Express, Request, Response } from "express"
import Redis from "ioredis"
import mongoose from "mongoose"
import { Server } from "socket.io"

import config from "./configurations/config"
import logging from "./configurations/logging"
import supportedOriginDocument from "./models/supported-origin-document/supported-origin-document.model"
import adminRoutes from "./routes/admin.route"
import applicationRoutes from "./routes/application.route"
import blogsRoutes from "./routes/blog.route"
import brandTierRoutes from "./routes/brand-tier.route"
import brandRoutes from "./routes/brand.route"
import chatGroupRoutes from "./routes/chat/chat-groups.route"
import commentReport from "./routes/comment-report.route"
import commentRoutes from "./routes/comment.route"
import contentCategories from "./routes/content-categories.route"
import creatorDetailRoutes from "./routes/creator-detail.route"
import followerRoutes from "./routes/follower.route"
import friendRequestRoutes from "./routes/friend-request.route"
import greetingPackageRoutes from "./routes/greeting-package.route"
import hashTagsRoutes from "./routes/hash-tags.route"
import postReport from "./routes/post-report.route"
import postRoutes from "./routes/post.route"
import propRoutes from "./routes/prop.route"
import properMeetProfileRoutes from "./routes/proper-meet-profile.route"
import propercoinsRoutes from "./routes/propercoin.route"
import reviewRoutes from "./routes/review.route"
import searchRoutes from "./routes/search.route"
import storyRoutes from "./routes/story.route"
import Subscribe from "./routes/subscribe.route"
import tips from "./routes/tips.route"
import transactionRoutes from "./routes/transaction.route"
import userDetailRoutes from "./routes/user-detail.route"
import videoCallBookingRoutes from "./routes/video-call-booking.route"
import videoGreetingOrdersRoutes from "./routes/video-greeting-order.route"
import videoGreetingRoutes from "./routes/video-greeting.route"
import socket from "./services/chat/chat-socket.service"


const app: Express = express()

const NAMESPACE = "Server"

// Public Folder
app.use(express.static("./public"))
console.log(config.mongo.url)

mongoose
  .connect(config.mongo.url)
  .then(() => {
    logging.info(NAMESPACE, "Mongo Connected")
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

mongoose.Promise = global.Promise

app.use(
  cors({
    origin: async (origin, callback) => {
      await supportedOriginDocument.supportedOrigin
        .find({}, "url")
        .exec()
        .then((result) => {
          const allowedOrigins = result.flatMap((o: any) => {
            return o.url
          })
          console.log(console.log(origin))
          if (!origin || !allowedOrigins.includes(origin)) {
            callback(new Error("Not allowed to access"))
          }
          callback(null, allowedOrigins)
        })
        .catch(() => {
          callback(new Error("Not allowed to access"))
        })
    }
  })
)

app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    )
  })

  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

  next()
})

/** Routes */

// Base routes

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to ProperFans-Backend Application." })
})
app.get(config.api.prefix, (req: Request, res: Response) => {
  res.json({ message: "Welcome to ProperFans-Backend Application." })
})

app.get(config.api.prefix, (req: Request, res: Response) => {
  res.json({ message: "Welcome to ProperFans-Backend Application." })
})

// Account Routes
app.use(config.api.prefix, userDetailRoutes)

// Brand Routes
app.use(config.api.prefix, brandRoutes)

// Applications created by user Routes
app.use(config.api.prefix, applicationRoutes)

// Posts Routes
app.use(config.api.prefix, postRoutes)

// Comments Routes
app.use(config.api.prefix, commentRoutes)

// Props Routes
app.use(config.api.prefix, propRoutes)

// Brand Tiers Routes
app.use(config.api.prefix, brandTierRoutes)

// Friend Request Routes
app.use(config.api.prefix, friendRequestRoutes)

// search Routes
app.use(config.api.prefix, searchRoutes)

// Story Routes
app.use(config.api.prefix, storyRoutes)

// Admin Routes
app.use(config.api.prefix, adminRoutes)

// Creator Details Routes
app.use(config.api.prefix, creatorDetailRoutes)

//Follower Routes
app.use(config.api.prefix, followerRoutes)

// Story Routes
app.use(config.api.prefix, storyRoutes)

//Propercoins Routes
app.use(config.api.prefix, propercoinsRoutes)

//ProperMeetProfile Routes
app.use(config.api.prefix, properMeetProfileRoutes)

//Transaction Routes
app.use(config.api.prefix, transactionRoutes)

//Greeting Package Routes
app.use(config.api.prefix, greetingPackageRoutes)

//Video Greeting Routes
app.use(config.api.prefix, videoGreetingRoutes)

//Video Greeting Orders Package Routes
app.use(config.api.prefix, videoGreetingOrdersRoutes)

//Video Call Booking Routes
app.use(config.api.prefix, videoCallBookingRoutes)

//Reviews Routes
app.use(config.api.prefix, reviewRoutes)

// Chat Group Routes
app.use(config.api.prefix, chatGroupRoutes)

// Post Report Routes
app.use(config.api.prefix, commentReport)
// Post Report Routes
app.use(config.api.prefix, postReport)

// Content Categories Routes
app.use(config.api.prefix, contentCategories)

// Subscribe Routes
app.use(config.api.prefix, Subscribe)
// tips Routes
app.use(config.api.prefix, tips)

//Hash Tags Routes
app.use(config.api.prefix, hashTagsRoutes)

//Blog Routes
app.use('/blogs', blogsRoutes)

const httpServer = http.createServer(app)

// Proper Chat - socket.io options
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
  transports: ["websocket"]
})

httpServer.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)

  // Proper Chat - redis pubsub & socket start
  if (config.redis.enable) {
    const pubClient = new Redis(config.redis.port, config.redis.host)
    pubClient.on("error", (err) => {
      console.log(`Error connecting to Redis because of ${err}`)
    })
    const subClient = pubClient.duplicate()
    io.adapter(createAdapter(pubClient, subClient))
    socket(io)
    logging.info(NAMESPACE, `Started Socket along with Redis pubsub on ${config.redis.host}:${config.redis.port}`)
  } else {
    logging.info(NAMESPACE, `Redis and Sockets are disabled`)
  }
})
