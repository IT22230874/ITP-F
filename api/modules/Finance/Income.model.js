const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
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
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

module.exports = IncomeModel;
