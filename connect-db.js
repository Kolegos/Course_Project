const { MongoClient } = require("mongodb");

const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://Kolegos:kolegos@kolegos-1q2nc.mongodb.net/test?retryWrites=true&w=majority";
let db = null;

async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  return db;
}

module.exports.connectDB = connectDB;

connectDB();
