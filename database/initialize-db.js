const { defaultState } = require("./defaultState");
const { connectDB } = require("./connect-db");

async function initializeDB() {
  let db = await connectDB();
  let user = await db.collection(`users`).findOne({ id: "U1" });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

module.exports.initializeDB = this.initializeDB;

initializeDB();
