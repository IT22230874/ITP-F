const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamid: {
    type: Number,
    required: true,
  },
  pid: {
    type: Number,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
});

const TeamModel = mongoose.model("team", teamSchema);

module.exports = TeamModel;
