const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  empid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  salary: {
    type: String,
    default: null,
  },
  paid: {
    type: Boolean,
    default: null,
  },

});

const SalaryModel = mongoose.model("Salary", salarySchema);

module.exports = SalaryModel;
