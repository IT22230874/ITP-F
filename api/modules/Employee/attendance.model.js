const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
  },
  check_in_time: {
    type: String,
  },
  check_out_time: {
    type: String,
  },
  date: {
    type: String,
  },
  position: {
    type: String,
  },
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = AttendanceModel;