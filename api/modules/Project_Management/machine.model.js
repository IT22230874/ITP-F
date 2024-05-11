const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  machineid: {
    type: Number,
    required: true,
  },
  pid: {
    type: Number,
    required: true,
  },
  machinename: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  releasequantity: {
    type:Number,
    default: 0
  }

});

const ProjectMachineModel = mongoose.model("Projectmachine", machineSchema);

module.exports = ProjectMachineModel;
