const express = require("express");
const {
  createPassenger,
  getAllPassengers,
  getPassengerById,
  updatePassengerById,
  deletePassengerById,
} = require("../controllers/passengerController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createPassenger);
router.get("/", getAllPassengers);
router.get("/:id", getPassengerById);
router.put("/:id", authenticateToken, updatePassengerById);
router.delete("/:id", authenticateToken, deletePassengerById);
module.exports = router;
