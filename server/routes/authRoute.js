const express = require("express");
const { authLimiter } = require("../middleware/rateLimiter");
const { register, login, getUsers } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/users", protect, getUsers);

module.exports = router;