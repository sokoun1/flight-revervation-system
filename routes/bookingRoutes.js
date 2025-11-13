const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
  searchBookings,
} = require("../controllers/bookingController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, createBooking);
router.get("/", authenticateToken, getAllBookings);
router.get("/search", searchBookings);
router.get("/:id", authenticateToken, getBookingById);
router.put("/:id", authenticateToken, updateBookingById);
router.delete("/:id", authenticateToken, deleteBookingById);
module.exports = router;
