import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import rateLimiter from "./middlewares/rateLimiter";
import router from "./routes/router";

// Initialize express application
const app: Application = express();

// ---------- Global Middlewares ----------
app.use(rateLimiter); // Rate limiting for all requests
app.use(helmet()); // Set security-related HTTP headers
app.use(
  cors({
    origin: config.cors_origin ?? "*", // Allow all origins or use a specific origin from config
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.json()); // Parse incoming JSON payloads

// ---------- Application Routes ----------
app.use("/api/v1", router);

// Health Check Endpoint (used to check if the server is running)
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "ALL IS WELL! ✅",
  });
});

// ---------- Error Handling ----------
// Global error handler middleware (handles errors in the application)
app.use(globalErrorHandler);
// 404 Not Found Handler (middleware for unknown routes)
app.use(notFound);

export default app;
