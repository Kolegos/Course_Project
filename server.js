const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./database/connect-db");
const mongoose = require("mongoose");
require("./database/initialize-db");

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;
const http = require("http").createServer(app);

const uri =
  process.env.ATLAS_URI ||
  "mongodb+srv://Kolegos:kolegos@kolegos-1q2nc.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(express.json());

addNewPost = async (post) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`posts`);
    await collection.insertOne(post);
  } catch (error) {
    console.log(error);
  }
};

async function getPosts() {
  try {
    let db = await connectDB();

    let posts = await db.collection(`posts`).find().toArray();
    return {
      posts,
    };
  } catch (error) {
    console.log(error);
  }
}

const Post = require("./models/post");
app.get("/api/posts/", (req, res) => {
  console.log(req.query.userId);
  Post.find({ userId: req.query.userId }).exec((err, posts) => {
    if (err) return console.log(err);

    posts.map((post) => {
      console.log(post);
    });
    res.send(posts);
  });
});

app.post("/api/posts/add", (req, res) => {
  const post = new Post(req.body).save();
});

app.get("/api/dash", (req, res) => {
  res.send("hello world");
});

app.get("/api/get", async (req, res) => {
  let state = await getPosts();
  res.send(state.posts);
});

app.post("/api/post/new", async (req, res) => {
  let post = req.body.post;
  await addNewPost(post);
  res.status(200).send();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  console.log("production build");
}

http.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports.getPosts = this.getPosts;
module.exports.addNewPost = this.addNewPost;
