const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: true,
    unique: true,
  },
  publishdate: {
    type: String,
    required: true,
  },
  closedate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "published", // Assuming "new" is the default status
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const TenderModel = mongoose.model("tender", tenderSchema);

module.exports = TenderModel;
