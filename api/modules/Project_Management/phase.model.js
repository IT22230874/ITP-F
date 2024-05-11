const mongoose = require("mongoose");

const phaseSchema = new mongoose.Schema({

  pid: {
    type: Number,
    required: true,
  },
  deadlineperphase: {
    type: Object,
    required: true,
  },
  numberofphases: {
    type: Number,
    required: true,
  },

});

const PhaseModel = mongoose.model("Phase", phaseSchema);

module.exports = PhaseModel;
