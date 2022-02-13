require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dynamicChar = require("./routes/chart-dynamic")
const passportLocalMongoose = require("passport-local-mongoose");
// @ROUTES
const home = require("./routes/home");
const register = require("./routes/register");
const login = require("./routes/login");
const company = require("./routes/company")
const user = require("./routes/user")
// const cLogin = require("./routes/login-company")

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

// *get routes
app.get("/", home.root);
app.get("/how-we-work", home.work);
app.get("/customer-dash", home.customer);
app.get("/login", login.loginGET)
app.get("/logout", login.logout)
app.get("/register", register.registerGET)
app.get("/process", (req, res) => {res.render("process");})
app.get("/user", user.dash)
app.get("/company", company.dash)
app.get("/add-material", user.add)
// app.get("/login-business", cLogin.loginCGET)
app.get("/raise-query", company.raiseGET)

// *post routes
app.post("/login", login.loginPOST)
app.post("/register-user", register.registerUserPOST)
app.post("/register-company", register.registerCompanyPOST)
app.post("/add-material", user.addPOST)
app.post("/raise-query", company.raisePOST)

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});  