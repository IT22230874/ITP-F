const mongoose = require("mongoose");

function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const IncomeSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
    set: formatDate
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
