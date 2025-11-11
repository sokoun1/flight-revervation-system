const Airport = require("../models/airport");

// Create a new airport
exports.createAirport = async (req, res) => {
  try {
    const airport = new Airport(req.body);
    await airport.save();
    res.status(201).json(airport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all airports
exports.getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find();
    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single airport by code
exports.getAirportByCode = async (req, res) => {
  try {
    const airport = await Airport.findOne({ AirportCode: req.params.code });
    if (!airport) {
      return res.status(404).json({ message: "Airport not found." });
    }
    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an airport by code
exports.updateAirportByCode = async (req, res) => {
  try {
    const airport = await Airport.findOneAndUpdate(
      { AirportCode: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    if (!airport) {
      return res.status(404).json({ message: "Airport not found." });
    }
    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an airport by code
exports.deleteAirportByCode = async (req, res) => {
  try {
    const airport = await Airport.findOneAndDelete({
      AirportCode: req.params.code,
    });
    if (!airport) {
      return res.status(404).json({ message: "Airport not found." });
    }
    res.status(200).json({ message: "Airport deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
