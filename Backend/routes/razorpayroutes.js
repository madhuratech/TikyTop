const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment, updateOrderStatus, getRazorpayConfig } = require("../controller/paymentcontroll");
const { createPaypalOrder, capturePaypalOrder, getPaypalConfig } = require("../controller/paypalpayment");

router.post("/order", createOrder);
router.post("/verify", verifyPayment);
router.post("/update", updateOrderStatus);
router.get("/razorpay/config", getRazorpayConfig);

// Paypal routes
router.get("/paypal/config", getPaypalConfig);
router.post("/paypal/order", createPaypalOrder);
router.post("/paypal/capture", capturePaypalOrder);

module.exports = router;
