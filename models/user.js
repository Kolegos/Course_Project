const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: false },
    profilePicture: { type: String, required: false },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    phoneNumber: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
