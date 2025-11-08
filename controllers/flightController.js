const Flight = require("../models/flight");

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json({ flight: flight });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a flight by ID
exports.updateFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a flight by ID
exports.deleteFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }
    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
