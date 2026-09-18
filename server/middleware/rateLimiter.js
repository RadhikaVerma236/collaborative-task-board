const rateLimit = require("express-rate-limit");

// Limit for authentication APIs
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  message: {
    message: "Too many requests. Please try again later.",
  },
});

// Limit for task APIs
const taskLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, 
  message: {
    message: "Too many task requests. Please try again later.",
  },
});

module.exports = {
  authLimiter,
  taskLimiter,
};