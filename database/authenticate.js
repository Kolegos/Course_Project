const md5 = require("md5");
const { connectDB } = require("./connect-db");

async function assembleUserState(user) {
  let db = await connectDB();

  let posts = await db.collection(`posts`).find({ owner: user.id }).toArray();

  return {
    posts,
    session: { authenticated: `AUTHENTICATED` },
    id: user.id,
  };
}

const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { email, password } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);
    let user = await collection.findOne({ name: email });

    if (!user) {
      console.log("User");
      return res.status(500).send("User not found");
    }

    let passwordCorrect = password === user.passwordHash;

    if (!passwordCorrect) {
      console.log("Psw");
      return res.status(500).send("Password incorrect");
    }
    let state = await assembleUserState(user);
    res.send(state);
  });
};

module.exports.authenticationRoute = authenticationRoute;
