const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const instagramRoutes = require("./routes/instagramroutes");
const paymentRoutes = require("./routes/razorpayroutes");
const youtubeRoutes = require("./routes/youtuberoutes");
const tiktokRoutes = require("./routes/tiktokroutes");
const facebookRoutes = require("./routes/facebookroutes");
const userRegisterRoutes = require("./routes/registerRoutes");
const pricingRoutes = require("./routes/pricingRoutes");

dns.setDefaultResultOrder("ipv4first");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
}));
app.use(express.json());

app.use("/api/instagram", instagramRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/tiktok", tiktokRoutes);
app.use("/api/facebook", facebookRoutes);
app.use("/api/auth", userRegisterRoutes);
app.use("/api/pricing", pricingRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API healthy" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
