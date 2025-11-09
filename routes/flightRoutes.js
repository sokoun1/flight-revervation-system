const express = require("express");
const {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
} = require("../controllers/flightController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createFlight);
router.get("/", getAllFlights);
router.get("/:id", getFlightById);
router.put("/:id", authenticateToken, updateFlightById);
router.delete("/:id", authenticateToken, deleteFlightById);
module.exports = router;
