import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTask(response.data.task);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!task) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">
          Task not found
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/board")}
          sx={{ mt: 2 }}
        >
          Back to Board
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/board")}
        sx={{ mb: 3 }}
      >
        Back to Board
      </Button>

      <Card>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {task.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {task.description || "No description provided"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Status
              </Typography>

              <Chip
                label={task.status}
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Priority
              </Typography>

              <Typography sx={{ fontWeight: 500 }}>
                {task.priority}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Assigned To
              </Typography>

              <Typography sx={{ fontWeight: 500 }}>
                {task.assignedTo?.name || "Unknown"}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Created By
              </Typography>

              <Typography sx={{ fontWeight: 500 }}>
                {task.createdBy?.name || "Unknown"}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Created At
              </Typography>

              <Typography sx={{ fontWeight: 500 }}>
                {new Date(task.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Last Updated
              </Typography>

              <Typography sx={{ fontWeight: 500 }}>
                {new Date(task.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TaskDetails;