const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  FlightID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Flight",
  },
  PassengerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Passenger",
  },
  PaymentStatus: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
