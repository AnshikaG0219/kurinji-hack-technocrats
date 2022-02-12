const Company = require("../models/partner")

const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

exports.joinGET = (req, res) => {
    res.render("join-company");
}

exports.joinPOST = (req, res) => {
    const company = new Company({
        company: req.body.company,
        email: req.body.email,
        service: req.body.service,
        phone: req.body.phone
    });
    twilio.messages.create({ 
         body: 'Thank You for connecting with sustain hack.',  
         messagingServiceSid: 'MGa31109663e481d07929c8c264c2c7d36',      
         to: req.body.phone
       }) 
      .then((message) => {
          console.log(message.sid)
          company.save(res.redirect("/"))
        }) 
      .catch(err => window.alert(err))
    console.log(company);
}
