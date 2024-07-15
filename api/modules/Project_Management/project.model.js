const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
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
  clientname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
