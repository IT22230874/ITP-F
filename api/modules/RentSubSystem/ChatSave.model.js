const mongoose = require("mongoose");

const ChatsaveSchema = mongoose.Schema({
  relationid: {
    type: Number,
    required: true,
  },
  starter: {
    type: Boolean,
    required: true,
  },
  partner: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  messageid: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const ChatsaveModel = mongoose.model("Chatsave", ChatsaveSchema);

module.exports = ChatsaveModel;
