const passport = require("passport");
const Material = require("../models/material");
const User = require("../models/user");
const Inventory = require("../models/inventory");

exports.dash = (req, res) => {
  if (req.isAuthenticated() && req.user.role === "user") {
    Material.find({userID: req.user._id}, function(err, result){
        res.render("customer-dash", { user: req.user, material: result });
    })
  } else {
    res.redirect("/login");
  }
};
exports.add = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add-material", { user: req.user });
  } else {
    res.redirect("/login");
  }
};
exports.addPOST = (req, res) => {
  if (req.isAuthenticated()) {
    const material = new Material({
      materialType: req.body.material,
      address: req.body.address,
      weight: Number(req.body.weight),
      userID: req.user._id,
      pin: Number(req.body.pin),
    });
    let p = req.user.points;
    if (Number(req.body.weight) >= 10) p += Number(req.body.weight);
    let query = req.body.material.toLowerCase();
    console.log(query);
    let up;
    if (query === "metal") {
      up = { $inc: { metal: Number(req.body.weight) } };
    } else if (query === "plastic") {
      up = { $inc: { plastic: Number(req.body.weight) } };
    } else if (query === "glass") {
      up = { $inc: { glass: Number(req.body.weight) } };
    } else if (query === "paper") {
      up = { $inc: { paper: Number(req.body.weight) } };
    }
    Inventory.updateOne(
      { _id: "6208fbf0e575d9e25e112f1c" },
      up,
      function (err, u) {
        if (err) {
          console.log(err);
        } else {
          console.log(u);
        }
      }
    );
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { points: p } },
      function (err, u) {
        if (err) {
          console.log(err);
          res.redirect("/user");
        }
      }
    );
    material.save(res.redirect(`/user`));
  } else {
    res.redirect("/login");
  }
};
