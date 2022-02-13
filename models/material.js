const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    materialType: String,
    address: String,
    userID: String,
    weight: Number,
    pin: Number,
    points: Number
});
  
module.exports = new mongoose.model("Material", materialSchema);