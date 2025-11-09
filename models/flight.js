const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  FlightNumber: { type: String, required: true, unique: true },
  DepartureDateTime: { type: String, required: true },
  ArrivalDateTime: { type: String, required: true },
  OriginAirportCode: { type: String, required: true, ref: "Airport" },
  DestinationAirportCode: { type: String, required: true, ref: "Airport" },
  AvailableSeats: { type: Number, required: true },
  AirlineID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Airline",
  },
});
module.exports = mongoose.model("Flight", FlightSchema);
