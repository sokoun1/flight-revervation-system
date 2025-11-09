const mongoose = require("mongoose");

const AirlineSchema = new mongoose.Schema({
  AirlineName: { type: String, required: true, unique: true },
  ContactNumber: { type: String, required: true },
  OperatingRegion: { type: String, required: true },
});

module.exports = mongoose.model("Airline", AirlineSchema);
