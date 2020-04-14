require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./database/connect-db");
const mongoose = require("mongoose");
const {
  authenticationRoute,
  authenticateToken,
  tokenRoute,
} = require("./database/authenticate");
require("./database/initialize-db");
const csprng = require("csprng");
const pbdkdf2 = require("pbkdf2");

const app = express();
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
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
authenticationRoute(app);
tokenRoute(app);

addNewPost = async (post) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`posts`);
    await collection.insertOne(post);
  } catch (error) {
    console.log(error);
  }
};

const User = require("./models/user");

app.post("/api/users/create", (req, res) => {
  const salt = csprng(64);
  const hashedPassword = pbdkdf2
    .pbkdf2Sync(req.body.password, salt, 1, 32, "sha512")
    .toString("hex");
  User.findById(req.body._id, (err, user) => {
    if (err) console.log(err);
    if (user == null) {
      const hashedUser = {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: hashedPassword,
        salt: salt,
      };
      User(hashedUser).save();
      res.status(200).send("zjbs senelyzai");
    } else {
      console.log("already registered");
      res.status(204).send("nezjbs senelyzai");
    }
  });
});

app.post("/api/users/", (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) console.log(err);

    if (user == null) return res.status(204).send("Nėra tokio vartotojo");

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    res.status(200).send(userData);
  });
});

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
  console.log(req.user);
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

app.get("/api/get", authenticateToken, async (req, res) => {
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
