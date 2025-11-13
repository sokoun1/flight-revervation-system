const Airline = require("../models/airline");

// Create a new airline
exports.createAirline = async (req, res) => {
  try {
    const airline = await Airline.create(req.body);
    await airline.save();
    res.status(201).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all airlines
exports.getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.status(200).json(airlines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all airlines with pagination, filtering, and search
exports.searchAirlines = async (req, res) => {
  const { page = 1, limit = 10, search, region } = req.query;
  const filter = {};
  if (search) {
    filter.AirlineName = { $regex: search, $options: "i" };
  }
  if (region) filter.OperatingRegion = region;
  try {
    const airlines = await Airline.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Airline.countDocuments(filter);
    res.status(200).json({
      airlines,
      totalPages: Math.ceil(count / limit),
      totalAirlines: count,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single airline by ID
exports.getAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    if (!airline) {
      return res.status(404).json({ message: "Airline not found." });
    }
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an airline by ID
exports.updateAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!airline) {
      return res.status(404).json({ message: "Airline not found." });
    }
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an airline by ID
exports.deleteAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndDelete(req.params.id);
    if (!airline) {
      return res.status(404).json({ message: "Airline not found" });
    }
    res.status(200).json({ message: "Airline deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
