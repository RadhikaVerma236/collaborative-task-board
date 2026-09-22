const express = require("express");
const { taskLimiter } = require("../middleware/rateLimiter");
const {
  createTask,
  getTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const isAdmin = require("../middleware/roleMiddleware");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, taskLimiter, getTasks);
router.get("/my", protect, taskLimiter, getMyTasks);
router.get("/:id", protect, getTaskById);
router.post("/", protect, isAdmin, taskLimiter, createTask);
router.patch("/:id", protect, isAdmin, taskLimiter, updateTask);
router.patch("/:id/status", protect, taskLimiter, updateTaskStatus);
router.delete("/:id", protect, isAdmin, taskLimiter, deleteTask);

module.exports = router;