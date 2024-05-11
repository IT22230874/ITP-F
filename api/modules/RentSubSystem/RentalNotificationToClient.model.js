const mongoose = require("mongoose");

const RentalNotoficationToClientSchema = mongoose.Schema({
  reqid: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  clientid: {
    type: String,
    required: true,
  },
});

const RentalNotoficationToClientModel = mongoose.model(
  "Clientnotification",
  RentalNotoficationToClientSchema
);

module.exports = RentalNotoficationToClientModel;
