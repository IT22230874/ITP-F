const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  clientid: {
    type: String,
  },
  machineid: {
    type: String,
    required: true,
  },
  clientname: {
    type: String,
  },
  machinename: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  reqid: {
    type: String,
    required: true,
  },
});

const RequestModel = mongoose.model("Request", RequestSchema);

module.exports = RequestModel;
