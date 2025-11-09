const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  BookingID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Booking",
  },
  PaymentMethod: { type: String, required: true },
  Amount: { type: Number, required: true },
  TransactionDateTime: { type: Date, required: true },
});

module.exports = mongoose.model("Payment", PaymentSchema);
