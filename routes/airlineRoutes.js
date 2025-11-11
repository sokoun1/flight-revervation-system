const express = require("express");
const {
  createAirline,
  getAllAirlines,
  getAirlineById,
  updateAirlineById,
  deleteAirlineById,
} = require("../controllers/airLineController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, createAirline);
router.get("/", getAllAirlines);
router.get("/:id", getAirlineById);
router.put("/:id", authenticateToken, updateAirlineById);
router.delete("/:id", authenticateToken, deleteAirlineById);
module.exports = router;
