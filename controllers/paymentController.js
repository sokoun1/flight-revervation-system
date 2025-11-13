const Payment = require("../models/payment");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments with search , pagination, and filter
exports.searchPayments = async (req, res) => {
  const { page = 1, limit = 10, method, amountMin, amountMax } = req.query;
  const filter = {};
  if (method) filter.PaymentMethod = method;
  if (amountMin) filter.Amount = { $gte: amountMin };
  if (amountMax) {
    filter.Amount = filter.Amount || {};
    filter.Amount.$lte = amountMax;
  }

  try {
    const payments = await Payment.find(filter)
      .populate("BookingID")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Payment.countDocuments(filter);
    res.status(200).json({
      payments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("BookingID");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment by ID
exports.updatePaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a payment by ID
exports.deletePaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
