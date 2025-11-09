const mongoose = require("mongoose");
const PassengerSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PassportNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Passenger", PassengerSchema);
