const dns = require("dns");
const mongoose = require("mongoose");

const configureDns = () => {
  const servers = (process.env.MONGO_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length) {
    dns.setServers(servers);
  }
};

const normalizeMongoUri = (rawUri) => {
  const uri = rawUri.trim().replace(/^['"]|['"]$/g, "");

  if (!uri.startsWith("mongodb://")) {
    return uri;
  }

  const hostPart = uri
    .slice("mongodb://".length)
    .split("/")[0]
    .split("@")
    .pop();

  if (hostPart.endsWith(".mongodb.net") && !hostPart.includes(":")) {
    return uri.replace("mongodb://", "mongodb+srv://");
  }

  return uri;
};

const connectDB = async () => {
  try {
    configureDns();

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    const mongoUri = normalizeMongoUri(process.env.MONGO_URI);
    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    if (process.env.MONGO_DB_NAME) {
      options.dbName = process.env.MONGO_DB_NAME.trim();
    }

    const conn = await mongoose.connect(mongoUri, options);

    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    if (error.message.includes("IP") || error.message.includes("whitelist")) {
      console.error("Atlas hint: add your current public IP address in MongoDB Atlas > Network Access.");
    }

    if (error.message.includes("querySrv") || error.message.includes("ENOTFOUND")) {
      console.error("DNS hint: confirm the Atlas connection string starts with mongodb+srv:// and the cluster hostname is correct.");
    }

    if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
      console.error("Atlas hint: check the Database Access username/password. If the password has special characters, URL-encode it in MONGO_URI.");
    }

    process.exit(1);
  }
};

module.exports = connectDB;
