const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    materialType: String,
    address: String,
    userID: String,
    weight: Number,
    pin: Number
});
  
module.exports = new mongoose.model("Query", querySchema);