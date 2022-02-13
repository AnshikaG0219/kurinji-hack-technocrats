const passport = require("passport");
const Query = require("../models/query");
const Inventory = require("../models/inventory");

exports.dash = (req, res) => {
  if (req.isAuthenticated() && req.user.role === "company") {
    Query.find({ userID: req.user._id }, function (err, result) {
      Inventory.findOne({ _id: "6208fbf0e575d9e25e112f1c" }, function (err, u) {
        res.render("company-dash", {
          user: req.user,
          material: result,
          chartData: u
        });
      });
    });
  } else {
    res.redirect("/login");
  }
};
exports.raiseGET = (req, res) => {
  if (req.isAuthenticated() && req.user.role === "company") {
    res.render("raise-query", { user: req.user });
  } else {
    res.redirect("/login");
  }
};
exports.raisePOST = (req, res) => {
  const query = new Query({
    materialType: req.body.material,
    address: req.body.address,
    weight: Number(req.body.weight),
    userID: req.user._id,
    pin: Number(req.body.pin),
  });
  let q = req.body.material.toLowerCase();
  let up;
  const val = -1 * Number(req.body.weight);
  if (q == "metal") {
    up = { $inc: { metal: val } };
  } else if (q == "plastic") {
    up = { $inc: { plastic: val } };
  } else if (q == "glass") {
    up = { $inc: { glass: val } };
  } else if (q == "paper") {
    up = { $inc: { paper: val } };
  }
  console.log(up, q, query, val);
  Inventory.findOneAndUpdate(
    { _id: "6208fbf0e575d9e25e112f1c" },
    up,
    function (err, u) {
      if (err) {
        console.log(err);
        res.redirect("/company");
      } else {
        console.log(u);
      }
    }
  );
  query.save(res.redirect("/company"));
};
