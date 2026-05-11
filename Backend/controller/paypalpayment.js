const client = require("../config/paypal");
const paypal = require("@paypal/checkout-server-sdk");
const Order = require("../model/order");
const axios = require("axios");

exports.getPaypalConfig = (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
};

exports.createPaypalOrder = async (req, res) => {
  try {

    const usdAmount = Number(req.body.amount).toFixed(2);

    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: usdAmount,
          },
        },
      ],

      application_context: {
        return_url:
          req.body.returnUrl ||
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/complete`,

        cancel_url:
          req.body.cancelUrl ||
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment`,
      },
    });

    const order = await client.execute(request);

    const approvalUrl = order.result.links.find(
      (l) => l.rel === "approve"
    )?.href;

    res.json({
      success: true,
      approvalUrl,
      orderID: order.result.id,
    });

  } catch (err) {

    console.error("Paypal create error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
exports.capturePaypalOrder = async (req, res) => {
  try {
    const { orderID, orders, amount, platform, username } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    if (capture.result.status === "COMPLETED") {
      const lastOrder = await Order.findOne().sort({ order_id: -1 });
      let orderNumber = lastOrder ? lastOrder.order_id + 1 : 1;

      const services = {
        instagram: {
          likes: { id: 2448, name: "Instagram Likes", min: 20 },
          views: { id: 1625, name: "Instagram Views", min: 50 },
          followers: { id: 2361, name: "Instagram Followers", min: 100 },
          comments: { id: 2460, name: "Instagram Comments", min: 20 },
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
        const p = o.platform || platform;
        const serviceName = Object.keys(o.order).find(k => o.order[k] > 0);
        if (!serviceName) continue;

        const service = services[p]?.[serviceName];
        if (!service) continue;

        const minRequired = service.min || 20;
        const quantity = Math.max(o.order[serviceName], minRequired);
        const link = o.link;

        const newOrder = new Order({
          order_id: orderNumber++,
          razorpay_order_id: orderID, // Use paypal order id here
          razorpay_payment_id: capture.result.id, // Use paypal capture id here
          username,
          amount,
          platform: p,
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

      return res.json({ success: true, message: "Payment verified and orders processed" });
    }

    res.json({ success: false, message: "Capture not completed" });
  } catch (err) {
    console.error("Paypal capture error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
