const md5 = require("md5");
const { connectDB } = require("./connect-db");
const mongoose = require("mongoose");
const User = require("../models/user");
const pbdkdf2 = require("pbkdf2");

const jwt = require("jsonwebtoken");

async function assembleUserState(user) {
  let db = await connectDB();

  let posts = await db.collection(`posts`).find({ userId: user.id }).toArray();
  console.log(posts);
  return {
    posts,
    session: { authenticated: `AUTHENTICATED` },
    id: user.id,
  };
}

const authenticationRoute = (app) => {
  app.post("/api/authenticate", (req, res) => {
    let { password } = req.body;
    const _id = req.body.email.toLowerCase().trim();

    User.findById(_id, (err, user) => {
      if (err) console.log(err);

      if (user == null) {
        return res.status(500).send("User not found");
      } else {
        const hashedPassword = pbdkdf2
          .pbkdf2Sync(password, user.salt, 1, 32, "sha512")
          .toString("hex");

        let passwordCorrect = hashedPassword === user.hash;
        if (!passwordCorrect) {
          console.log("Psw");
          return res.status(500).send("Password incorrect");
        }
        console.log(user._id);
        const accessToken = jwt.sign(user._id, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken, user: user });
      }
    });
  });
};

const tokenRoute = (app) => {
  app.get("/api/checktoken", authenticateToken, (req, res) => {
    res.send({ user: req.user });
  });
};

async function sendState(user, res) {
  let state = await assembleUserState(user);
  res.send(state);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports.authenticationRoute = authenticationRoute;
module.exports.authenticateToken = authenticateToken;
module.exports.tokenRoute = tokenRoute;
