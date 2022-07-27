import mongoose from 'mongoose'

import { BlogDocument } from "./blog.interface"

/**
 * blogSchema for the database
 */

const blogSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId , ref: "UserDetail" },
    title: { required: true, type: String },
    body: { required: true, type: String },
    category: { required: true, type: String },
    media: { required: true,type: Array },
    author: { required: true, type: String },
    permalink: { required: true, type: String },
    readTime: { required: true, type: String },
    status: { required: true, type: String },
}, {
    timestamps: true, minimize: false
})
blogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id
      delete ret.password
    },
})

const blogModel = mongoose.model<BlogDocument>("Blog", blogSchema, 'blogs')

export default blogModel
