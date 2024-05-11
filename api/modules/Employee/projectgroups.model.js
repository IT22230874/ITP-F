const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  gid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const GroupModel = mongoose.model("Group", groupSchema);

module.exports = GroupModel;
