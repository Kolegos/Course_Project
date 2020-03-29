const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./connect-db");
require("./initialize-db");

let port = process.env.PORT || 7777;
let app = express();

app.listen(port, "0.0.0.0", console.log("listening on " + port));

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

addNewPost = async post => {
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

    let posts = await db
      .collection(`posts`)
      .find()
      .toArray();
    return {
      posts
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports.getPosts = this.getPosts;
module.exports.addNewPost = this.addNewPost;

app.get("/dash", (req, res) => {
  res.send("hello world");
});

app.get("/get", async (req, res) => {
  let state = await getPosts();
  res.send(state.posts);
});

app.post("/post/new", async (req, res) => {
  let post = req.body.post;
  await addNewPost(post);
  res.status(200).send();
});
