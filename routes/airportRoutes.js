const express = require("express");
const {
  createAirport,
  getAllAirports,
  getAirportByCode,
  updateAirportByCode,
  deleteAirportByCode,
  searchAirports,
} = require("../controllers/airportController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createAirport);
router.get("/", getAllAirports);
router.get("/search", searchAirports);
router.get("/:code", getAirportByCode);
router.put("/:code", authenticateToken, updateAirportByCode);
router.delete("/:code", authenticateToken, deleteAirportByCode);
module.exports = router;
