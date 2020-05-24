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
  refreshTokenRoute,
  logoutRoute,
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
  useUnifiedTopology: true,
  useFindAndModify: false,
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
refreshTokenRoute(app);
logoutRoute(app);

addNewPost = async (post) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`posts`);
    await collection.insertOne(post);
  } catch (error) {
    console.log(error);
  }
};
const Comment = require("./models/comment");

app.post("/api/comments/add", (req, res) => {
  Comment(req.body)
    .save()
    .then((comment) => {
      res.send(comment);
    });
});

app.get("/api/comments/", (req, res) => {
  Comment.find({ PostID: req.query.PostID }).exec((err, comments) => {
    if (err) return console.log(err);

    res.send(comments.reverse());
  });
});

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
      res.status(200).send("registered successfully");
    } else {
      res.status(204).send("already registered");
    }
  });
});
app.post("/api/edit/EditProfilePage", (req, res) => {
  User.findById({ _id: req.body._id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      //console.log(foundObject);
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.firstName) {
          foundObject.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          foundObject.lastName = req.body.lastName;
        }
        if (req.body.city) {
          foundObject.city = req.body.city;
        }
        if (req.body.email) {
          foundObject.email = req.body.email;
        }
        if (req.body.phoneNumber) {
          foundObject.phoneNumber = req.body.phoneNumber;
        }
        if (req.body.profileImage) {
          foundObject.profilePicture = req.body.profileImage;
        }
        foundObject.save(function (err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
});

async function getLength(search, category) {
  try {
    let db = await connectDB();

    let length = 0;
    length = await db.collection(`posts`).countDocuments({
      title: { $regex: search, $options: "i" },
      category: { $regex: category },
    });
    return {
      length,
    };
  } catch (error) {
    console.log(error);
    return length;
  }
}

app.post("/api/users/", (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) console.log(err);

    if (user == null) return res.status(204).send("Nėra tokio vartotojo");

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
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
async function getMorePosts(number, search, category) {
  try {
    let db = await connectDB();
    let posts = await db
      .collection(`posts`)
      .aggregate([
        {
          $match: {
            title: { $regex: search, $options: "i" },
            category: { $regex: category },
          },
        },
        { $sort: { updatedAt: 1 } },
        { $limit: parseInt(number) }, //mazinant sita imi sekancius elementus nuo virsaus
        { $sort: { updatedAt: -1 } },
        { $limit: 10 },
      ])
      .toArray();
    return {
      posts,
    };
  } catch (error) {
    console.log(error);
  }
}

const Post = require("./models/post");

app.post(`/api/Edit`, (req, res) => {
  Post.findById({ _id: req.body._id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.title) {
          foundObject.title = req.body.title;
        }
        if (req.body.description) {
          foundObject.description = req.body.description;
        }
        if (req.body.price) {
          foundObject.price = req.body.price;
        }
        if (req.body.category) {
          foundObject.category = req.body.category;
        }
        if (req.body.phoneNumber) {
          foundObject.phoneNumber = req.body.phoneNumber;
        }

        foundObject.save(function (err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
});
app.post("/api/userPosts", (req, res) => {
  Post.find({ userId: req.body._id }).exec((err, posts) => {
    if (err) {
      return console.log(err);
    }

    res.send(posts);
  });
});
app.get("/api/posts/getOne", (req, res) => {
  Post.find({ _id: req.query.id }).exec((err, post) => {
    if (err) {
      return console.log(err);
    }
    res.send(post);
  });
});

app.get("/api/posts/", (req, res) => {
  Post.find({ userId: req.query.userId }).exec((err, posts) => {
    if (err) return console.log(err);

    posts.map((post) => {
      res.send(post);
    });
  });
});

app.post("/api/posts/add", (req, res) => {
  const post = new Post(req.body).save().then((post) => {
    res.send(post);
  });
});

app.get("/api/get", authenticateToken, async (req, res) => {
  let state = await getPosts();
  res.send(state.posts);
});

app.get("/api/getMore", async (req, res) => {
  let search = "";
  let category = "";
  if (req.query.search) search = req.query.search;
  if (req.query.category) category = req.query.category;
  let state = await getMorePosts(req.query.number, search, category);
  res.send(state.posts);
});

app.get("/api/postsLength", async (req, res) => {
  let search = "";
  let category = "";
  if (req.query.search) search = req.query.search;
  if (req.query.category) category = req.query.category;
  let state = await getLength(search, category);
  res.send(state.length.toString());
});

app.post("/api/post/new", async (req, res) => {
  let post = req.body.post;
  await addNewPost(post);
  res.status(200).send();
});

const Category = require("./models/category");

app.post("/api/categories/add", (req, res) => {
  const category = new Category(req.body).save();
  res.send(req.body);
});

app.get("/api/categories/getAll", async (req, res) => {
  let db = await connectDB();
  let categories = await db.collection(`categories`).find().toArray();
  res.send(categories);
});

app.post("/api/categories/delete", async (req, res) => {
  let db = await connectDB();
  let collection = db.collection(`categories`);
  let regex = new RegExp("^" + req.body.category);
  collection.deleteMany({ category: regex });
  res.send(req.body);
});

app.get("/api/search", async (req, res) => {
  let db = await connectDB();
  let posts = db.collection(`posts`);
  let results = await posts
    .find({ title: { $regex: req.query.query, $options: "i" } })
    .toArray();
  res.send(results);
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

const router = express.Router();

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// We export the router so that the server.js file can pick it up
module.exports = router;

const images = require("./database/images");
app.use("/api/images", images);

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory

if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

module.exports.getPosts = this.getPosts;
module.exports.addNewPost = this.addNewPost;
