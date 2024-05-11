const mongoose = require("mongoose");

const LiabilitySchema = mongoose.Schema({
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payee: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  amountperinstallment: {
    type: Number,
    required: true,
  },
  finished: {
    type: Number,
    required: true,
  },
});

const LiableModel = mongoose.model("Liable", LiabilitySchema);

module.exports = LiableModel;
