const ActivityLog = require("../models/ActivityLog");

const getActivityLogs = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    const query = {};

    if (req.query.taskId) {
      query.task = req.query.taskId;
    }

    // If cursor exists, get logs older than the cursor
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const totalActivities = await ActivityLog.countDocuments(query);

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const todayActivities = await ActivityLog.countDocuments({
  ...query,
  createdAt: { $gte: startOfToday },
});

    const logs = await ActivityLog.find(query)
      .populate("user", "name email")
      .populate("task", "title")
      .sort({ createdAt: -1 })
      .limit(limit + 1);

    // Check if there are more logs
    const hasMore = logs.length > limit;

    // Only return the requested number of logs
    const results = logs.slice(0, limit);

    // Use the last log's createdAt as the next cursor
    const nextCursor =
      hasMore && results.length > 0
        ? results[results.length - 1].createdAt
        : null;

    res.json({
      success: true,
      logs: results,
      nextCursor,
      hasMore,
      totalActivities,
      todayActivities,
    });
  } catch (error) {
    console.error("Get activity logs error:", error);

    res.status(500).json({
      message: "Failed to fetch activity logs",
    });
  }
};

module.exports = {
  getActivityLogs,
};