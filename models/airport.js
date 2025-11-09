const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema({
  AirportCode: { type: String, required: true, unique: true },
  AirportName: { type: String, required: true },
  Location: { type: String, required: true },
  Facilities: { type: [String] },
});

module.exports = mongoose.model("Airport", AirportSchema);
