const mongoose = require("mongoose");

const ProjectfinanceSchema = mongoose.Schema({
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
  projectid: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  projectname: {
    type: String,
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
  finished: {
    type: Number,
    required: true,
  },
  amountperinstallment: {
    type: Number,
    required: true,
  },
});

const prjFinModel = mongoose.model("projectfinance", ProjectfinanceSchema);

module.exports = prjFinModel;
