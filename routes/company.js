const passport = require("passport");
const Query = require("../models/query");
const Inventory = require("../models/inventory")
// const accountSid = process.env.SID;
// const authToken = process.env.AUTH_TOKEN;
// const twilio = require('twilio')(accountSid, authToken, {
//     lazyLoading: true
// });

exports.joinPOST = (req, res) => {
  const company = new Company({
    company: req.body.company,
    email: req.body.email,
    service: req.body.service,
    phone: req.body.phone,
  });
  // twilio.messages.create({
  //      body: 'Thank You for connecting with sustain hack.',
  //      messagingServiceSid: 'MGa31109663e481d07929c8c264c2c7d36',
  //      to: req.body.phone
  //    })
  //   .then((message) => {
  //       console.log(message.sid)
  //       company.save(res.redirect("/"))
  //     })
  //   .catch(err => window.alert(err))
  console.log(company);
};
exports.dash = (req, res) => {
  if (req.isAuthenticated() && req.user.role === "company") {
      let total = 0;
      let metal = 0;
      let plastic = 0;
      let glass = 0;
      let paper = 0;
    Inventory.findOne(
        { _id: "6208b36374b8003b6489af58" },
        function (err, u) {
          console.log(u);
          total += u.metal + u.plastic + u.paper + u.glass;
          metal = (u.metal*100)/total;
          console.log(total, metal);
        }
      );
    Query.find({userID: req.user._id}, function(err, result){
        res.render("company-dash", { user: req.user, material: result, total: total});
    })
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
  const val = -1*Number(req.body.weight);
  console.log(query, q, val);
  if (q == "metal") {
    up = { $inc: { metal: val }}
  } else if (query == "plastic") {
    up = { $inc: { plastic: val }}
  } else if (query == "glass") {
    up = { $inc: { glass: val }}
  } else if (query == "paper") {
    up = { $inc: { paper: val }}
  }
  console.log(up, q, query, val);
  Inventory.findOneAndUpdate(
    { _id: "6208b36374b8003b6489af58"},
    up,
    function (err, u) {
      if (err) {
        console.log(err);
        res.redirect("/company")
      } else {
        console.log(u);
      }
    }
  );
  query.save(res.redirect("/company"))
};
