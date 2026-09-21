const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { taskId } = req.params;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.create({
      text: text.trim(),
      task: taskId,
      user: req.user.id,
    });

    await comment.populate("user", "name email");

    const io = req.app.get("io");

    if (io) {
    io.emit("commentAdded", comment);
    }

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.find({
      task: taskId,
    })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

module.exports = {
  createComment,
  getComments,
};