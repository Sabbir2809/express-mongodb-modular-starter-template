import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => (req.user ? 1000 : 100),
  message: {
    success: false,
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => req.ip || "unknown-ip",
});

export default rateLimiter;
