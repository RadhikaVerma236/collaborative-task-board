import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { io } from "socket.io-client";

function TaskComments({ task }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!task?._id) {
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/comments/${task._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [task?._id, token]);

  useEffect(() => {
    if (!task?._id) {
      return;
    }

    const socket = io("http://localhost:5000");

    socket.on("commentAdded", (newComment) => {
      if (newComment.task === task._id) {
        setComments((currentComments) => [
          ...currentComments,
          newComment,
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [task?._id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/comments/${task._id}`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Comments Header */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" fontWeight={700}>
          Comments
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Discuss this task with your team
        </Typography>
      </Box>

      {/* Comments List */}
      <Stack spacing={2}>
        {comments.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
            >
              No comments yet
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              Start the conversation about this task.
            </Typography>
          </Paper>
        ) : (
          comments.map((comment) => {
            const userName = comment.user?.name || "Unknown User";
            const avatarLetter = userName.charAt(0).toUpperCase();

            return (
              <Paper
                key={comment._id}
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      fontSize: 15,
                      fontWeight: 600,
                      backgroundColor: "primary.main",
                    }}
                  >
                    {avatarLetter}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography fontWeight={600}>
                        {userName}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        mt: 1,
                        lineHeight: 1.6,
                        wordBreak: "break-word",
                      }}
                    >
                      {comment.text}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            );
          })
        )}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Add Comment */}
      <Box>
        <Typography fontWeight={600} sx={{ mb: 1.5 }}>
          Add a comment
        </Typography>

        <TextField
          placeholder="Write a comment..."
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 1.5,
          }}
        >
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleAddComment}
            disabled={!commentText.trim() || loading}
          >
            {loading ? "Adding..." : "Add Comment"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskComments;