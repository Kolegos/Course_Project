const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    features: { type: Array, required: true },
    description: { type: String, required: true },
    photos: { type: [String], required: false },
    phoneNumber: { type: String, required: false },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
