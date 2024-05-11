const mongoose = require("mongoose");

const machinary = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  machineid: {
    type: Number,
    required: true,
    unique: true,
  },
  stock: {
    type: String,
    required: true,
  },
  priceperday: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
});

const MachinaryModel = mongoose.model("Machine", machinary);

module.exports = MachinaryModel;
