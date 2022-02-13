const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    metal:{type: Number, default: 0},
    plastic: {type: Number, default: 0},
    paper: {type: Number, default: 0},
    glass: {type: Number, default: 0}
});
  
module.exports = new mongoose.model("Inventory", inventorySchema);