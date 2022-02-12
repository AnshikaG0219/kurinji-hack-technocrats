const User = require("../models/user");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.registerGET = (req, res) => {
  res.render("register");
};
exports.registerPOST = (req, res) => {
  User.register(
    {
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/")
        });
      }
    }
  );
};
