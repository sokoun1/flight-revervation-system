const Booking = require("../models/booking");
const Flight = require("../models/flight");
// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const flight = await Flight.find({ FlightID: req.body.FlightID });
    if (!flight) {
      return res.send("Flight not found");
    }
    const booking = await Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("FlightID PassengerID");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings with pagination, filtering, and search
exports.searchBookings = async (req, res) => {
  const { page = 1, limit = 10, passener, flight, status } = req.query;
  const filter = {};
  if (passener) filter.PassengerID = passener;
  if (flight) filter.FlightID = flight;
  if (status) filter.PaymentStatus = status;

  try {
    const bookings = await Booking.find(filter)
      .populate("FlightID PassengerID")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Booking.countDocuments(filter);
    res.status(200).json({
      bookings,
      totalPages: Math.ceil(count / limit),
      totalBookings: count,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "FlightID PassengerID"
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking by ID
exports.updateBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a booking by ID
exports.deleteBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
