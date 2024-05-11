const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  expenseid: {
    type: Number,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
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
});

const ExpenseModel = mongoose.model("expense", ExpenseSchema);

module.exports = ExpenseModel;
