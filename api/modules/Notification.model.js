const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

const NotificationsModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationsModel;
