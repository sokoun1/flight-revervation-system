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
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all passengers with pagination, filtering, and search
exports.searchPassengers = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { FirstName: { $regex: search, $options: "i" } },
      { LastName: { $regex: search, $options: "i" } },
      { Email: { $regex: search, $options: "i" } },
    ];
  }
  try {
    const passengers = await Passenger.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Passenger.countDocuments(filter);
    res.status(200).json({
      passengers,
      totalPages: Math.ceil(count / limit),
      totalPassengers: count,
      currentPage: page,
    });
  } catch (error) {}
};

// Get a single passenger by ID
exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found." });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a passenger by ID
exports.updatePassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found." });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a passenger by ID
exports.deletePassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found." });
    }
    res.status(200).json({ message: "Passenger deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
