const mongoose = require("mongoose");

const inventory = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitofmeasure: {
    type: String,
    required: true,
  },
  itemid: {
    type: Number,
    required: true,
    unique: true,
  },
  stock: {
    type: String,
    required: true,
  },
  minStock: {
    type: Number,
    required: true,
  },
});

const InventoryModel = mongoose.model("Item", inventory);

module.exports = InventoryModel;
