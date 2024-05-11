const mongoose = require("mongoose");

const attendenceSchema = mongoose.Schema({
  empid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  arrival: {
    type: String,
    default: null,
  },
  departure: {
    type: String,
    default: null,
  },
  attendencetype: {
    type: String,
  },

});

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = AttendenceModel;
