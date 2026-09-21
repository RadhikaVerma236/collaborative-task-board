const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      createdBy: req.user.id,
    });

    await task.populate([
      {
        path: "assignedTo",
        select: "name email",
      },
      {
        path: "createdBy",
        select: "name email",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    task.priority = priority;
    task.dueDate = dueDate;

    await task.save();

    await task.populate([
      {
        path: "assignedTo",
        select: "name email",
      },
      {
        path: "createdBy",
        select: "name email",
      },
    ]);

    // Create activity log
    await ActivityLog.create({
      action: "Task updated",
      task: task._id,
      user: req.user.id,
    });

    const io = req.app.get("io");

    if (io) {
      io.emit("taskUpdated", task);
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const oldStatus = task.status;

    task.status = status;

    await task.save();

    // Create activity log
    await ActivityLog.create({
      action: `Status changed from ${oldStatus} to ${status}`,
      task: task._id,
      user: req.user.id,
    });

    const io = req.app.get("io");

    console.log("🔥 EMITTING SOCKET EVENT");

    io.emit("taskUpdated", task);

    res.json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      message: "Failed to update task status",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    await ActivityLog.create({
      action: "Task deleted",
      task: task._id,
      user: req.user.id,
    });

    const io = req.app.get("io");

    if (io) {
      io.emit("taskDeleted", task._id);
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
