const express = require("express");
const {
  createPassenger,
  getAllPassengers,
  getPassengerById,
  updatePassengerById,
  deletePassengerById,
  searchPassengers,
} = require("../controllers/passengerController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createPassenger);
router.get("/", getAllPassengers);
router.get("/search", searchPassengers);
router.get("/:id", getPassengerById);
router.put("/:id", authenticateToken, updatePassengerById);
router.delete("/:id", authenticateToken, deletePassengerById);
module.exports = router;
