const mongoose = require("mongoose");

const AssetSchema = mongoose.Schema({
  assetid: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const AssetModel = mongoose.model("expense", AssetSchema);

module.exports = AssetModel;
