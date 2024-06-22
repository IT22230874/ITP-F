const mongoose = require("mongoose");

const RentalSchema = mongoose.Schema({
  rentid: {
    type: Number,
    required: true,
  },
  clientid: {
    type: String,
  },
  clientname: {
    type: String,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
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
  status: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perinstallment: {
    type: Number,
    required: true,
  },
  machineid: {
    type: String,
    required: true,
  },
});

const RentModel = mongoose.model("Rent", RentalSchema);

module.exports = RentModel;
