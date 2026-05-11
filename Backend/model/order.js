const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  order_id: Number,   

  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  username: String,

  amount: Number,
  platform: String,

  service: {
    service_id: Number,
    name: String
  },

  link: String,
  quantity: Number,

  provider_order_id: String,

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);