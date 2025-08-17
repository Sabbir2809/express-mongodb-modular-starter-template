import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

// 🔴 Handle uncaught exceptions (synchronous errors)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception detected:", err);
  process.exit(1); // Exit immediately
});

// 🚀 Start server with DB connection
async function startServer() {
  try {
    await mongoose.connect(config.database_url);

    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server Error:", err);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

// 🔴 Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);

  if (server) {
    server.close(() => {
      console.log("Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
