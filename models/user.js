const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  phone: String,
  role: String,
  service: String,
  points: Number
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);

