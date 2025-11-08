const Passenger = require("../models/passenger");

// Create a new passenger
exports.createPassenger = async (req, res) => {
  try {
    const passenger = new Passenger(req.body);
    await passenger.save();
    res.status(201).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all passengers
exports.getAllPassengers = async (req, res) => {
  try {
    const passenger = await Passenger.find();
    res.status(201).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
