const md5 = require("md5");
const { connectDB } = require("./connect-db");
const mongoose = require("mongoose");
const User = require("../models/user");
const pbdkdf2 = require("pbkdf2");

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
  app.post("/authenticate", async (req, res) => {
    let { password } = req.body;
    const _id = req.body.email;
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
        sendState(user, res);
      }
    });
  });
};

async function sendState(user, res) {
  let state = await assembleUserState(user);
  res.send(state);
}

module.exports.authenticationRoute = authenticationRoute;
