require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// @ROUTES
const home = require("./routes/home");
const register = require("./routes/register");
const login = require("./routes/login");

const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.get("/", home.root);
app.get("/how-we-work", home.work);
app.get("/login", login.loginGET)
app.get("/register", register.registerGET)
app.post("/login", login.loginPOST)
app.post("/register", register.registerPOST)

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});  