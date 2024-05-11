const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  relationid: {
    type: Number,
    required: true,
    unique: true,
  },
  starter: {
    type: String,
    required: true,
  },
  partner: {
    type: String,
    required: true,
  },
});

const ChatModel = mongoose.model("Chat", ChatSchema);

module.exports = ChatModel;
