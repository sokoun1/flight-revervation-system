const express = require("express");
const {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
  SearchFlights,
} = require("../controllers/flightController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createFlight);
router.get("/", getAllFlights);
router.get("/search", SearchFlights);
router.get("/:id", getFlightById);
router.put("/:id", authenticateToken, updateFlightById);
router.delete("/:id", authenticateToken, deleteFlightById);
module.exports = router;
