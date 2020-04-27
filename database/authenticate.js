const md5 = require("md5");
const { connectDB } = require("./connect-db");
const mongoose = require("mongoose");
const User = require("../models/user");
const pbdkdf2 = require("pbkdf2");
const RefreshToken = require("../models/refreshToken");

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

        const accessToken = generateAccessToken(user._id);
        const refreshToken = jwt.sign(
          user._id,
          process.env.REFRESH_TOKEN_SECRET
        );
        RefreshToken({ token: refreshToken }).save();

        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        });
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

const refreshTokenRoute = (app) => {
  app.post("/api/refreshToken", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    RefreshToken.findOne({ token: refreshToken }).exec((err, token) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          const accessToken = generateAccessToken(user);
          res.json({ accessToken: accessToken, user: user });
        }
      );
    });
  });
};

const logoutRoute = (app) => {
  app.post("/api/logout", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    RefreshToken.findOneAndDelete({ token: refreshToken }).exec(
      (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(401);
        }
        res.sendStatus(200);
      }
    );
  });
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

function generateAccessToken(id) {
  return jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
}

module.exports.authenticationRoute = authenticationRoute;
module.exports.authenticateToken = authenticateToken;
module.exports.tokenRoute = tokenRoute;
module.exports.refreshTokenRoute = refreshTokenRoute;
module.exports.logoutRoute = logoutRoute;
