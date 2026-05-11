  const Razorpay = require("razorpay");
  const Order = require("../model/order"); 
  const axios = require("axios");
  const {fetchCurrencyData  } = require("../services/currencyservices");
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  exports.getRazorpayConfig = (req, res) => {
    res.json({ keyId: process.env.RAZORPAY_KEY_ID || "" });
  };

  exports.createOrder = async (req, res) => {

  try {

    console.log("Incoming order:", JSON.stringify(req.body, null, 2));

   const rate = await fetchCurrencyData();
   const usdAmount = Number(req.body.amount);
// convert to rupees
    const inrAmount = usdAmount * rate;
// convert to paise (ONLY ONCE)
   const amountInPaise = Math.round(inrAmount * 100);
   
   const options = {
   amount: amountInPaise,
    currency: "INR",
   receipt: "order_" + Date.now()
  };

    const razorpayOrder = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order: razorpayOrder,
      convertedAmount: inrAmount
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order"
    });

  }

};


 exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      username,
      orders
    } = req.body;

    const lastOrder = await Order.findOne().sort({ order_id: -1 });
    let orderNumber = lastOrder ? lastOrder.order_id + 1 : 1;

    const services = {
      instagram: {
        likes: { id: 2448, name: "Instagram Likes", min: 20 },
        views: { id: 1625, name: "Instagram Views", min: 50 },
        followers: { id: 2361, name: "Instagram Followers", min: 100 },
        comments: { id: 2460, name: "Instagram Comments", min: 50 },
        shares: { id: 576, name: "Instagram Shares", min: 50 }
      },
      youtube: {
        likes: { id: 2456, name: "YouTube Likes", min: 10 },
        views: { id: 2457, name: "YouTube Views", min: 500 },
        comments: { id: 242, name: "YouTube Comments", min: 20 },
        subscribers: { id: 2411, name: "YouTube Subscribers", min: 10 }
      },
      tiktok: {
        likes: { id: 1617, name: "TikTok Likes", min: 50 },
        views: { id: 310, name: "TikTok Views", min: 100 },
        followers: { id: 2384, name: "TikTok Followers", min: 50 },
        shares: { id: 703, name: "TikTok Shares", min: 50 }
      }
    };

    for (const o of orders) {
      const platform = o.platform;
      const serviceName = Object.keys(o.order).find(k => o.order[k] > 0);

      if (!serviceName) continue;

      const service = services[platform]?.[serviceName];
      if (!service) continue;

      // --- DYNAMIC QUANTITY FIX ---
      // This ensures we never send less than the provider's minimum
      const minRequired = service.min || 20;
      const quantity = Math.max(o.order[serviceName], minRequired);
      
      const link = o.link;

      const newOrder = new Order({
        order_id: orderNumber++,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        username,
        amount,
        platform,
        service: {
          service_id: service.id,
          name: service.name
        },
        link,
        quantity,
        status: "paid"
      });

      await newOrder.save();

      try {
        const panelApiUrl = process.env.PANEL_API_URL;

        if (!panelApiUrl) {
          console.warn("PANEL_API_URL is not configured; skipping provider order push.");
          continue;
        }

        await axios.post(`${panelApiUrl.replace(/\/+$/, "")}/orders/create`, {
          order_id: newOrder.order_id,
          service: {
            service_id: service.id,
            name: service.name
          },
          link,
          quantity
        });
      } catch (err) {
        console.log("Panel API Error:", err.response?.data || err.message);
      }
    }

    res.json({
      success: true,
      message: "Payment verified and orders processed"
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ success: false });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log(`Received status update for Order ${orderId}: ${status}`);
    
    const order = await Order.findOneAndUpdate(
      { order_id: orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
