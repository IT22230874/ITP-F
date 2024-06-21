const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joindate: {
    type: String,
    required: true,
  },
  gid: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
