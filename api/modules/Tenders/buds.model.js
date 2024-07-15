const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  
  bidid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  organizationname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  weblink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender",
    required: true,
  },

  bidamount: {
    type: String,
    required: true,
  },
});

const BidModel = mongoose.model("bid", bidSchema);

module.exports = BidModel;
