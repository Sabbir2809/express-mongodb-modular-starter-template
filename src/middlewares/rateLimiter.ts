import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    statusCode: 429,
    message: "Too Many Requests. Please try again later.",
  },
  standardHeaders: true, // Adds RateLimit-* headers
  legacyHeaders: false, // Disables deprecated X-RateLimit-* headers
  // keyGenerator: (req) => req.ip || "unknown-ip",
});

export default rateLimiter;
