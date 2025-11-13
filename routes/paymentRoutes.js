const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  searchPayments,
} = require("../controllers/paymentController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", createPayment);
router.get("/", authenticateToken, getAllPayments);
router.get("/search", searchPayments);
router.get("/:id", getPaymentById);
router.put("/:id", authenticateToken, updatePaymentById);
router.delete("/:id", authenticateToken, deletePaymentById);
module.exports = router;
