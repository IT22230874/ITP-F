const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resourceid: {
    type: Number,
    required: true,
  },
  pid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  usedquantity: {
    type: Number,
    required: true,
  },

});

const ResourceModel = mongoose.model("Resource", resourceSchema);

module.exports = ResourceModel;
