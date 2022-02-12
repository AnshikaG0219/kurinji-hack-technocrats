const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);

