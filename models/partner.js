const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company: String,
  username: String,
  service: String,
  phone: String,
  password: String
});

module.exports = new mongoose.model("Company", companySchema);

