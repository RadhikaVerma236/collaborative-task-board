import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { AccessTime, Update } from "@mui/icons-material";

function TaskActivity({ open, task }) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    if (!open || !task?._id) return;

    const fetchActivity = async () => {
      try {
        setActivityLoading(true);

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/activity?taskId=${task._id}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setActivityLogs(response.data.logs || []);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivity();
  }, [open, task]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString();
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        Activity
      </Typography>

      <Box
        sx={{
          p: 2.5,
          backgroundColor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {activityLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 3,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        ) : activityLogs.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 2,
            }}
          >
            <AccessTime
              sx={{
                fontSize: 32,
                color: "text.secondary",
                mb: 1,
              }}
            />

            <Typography variant="body2" color="text.secondary">
              No activity yet.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {activityLogs.map((log) => (
              <Box
                key={log._id}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Update sx={{ fontSize: 17 }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {log.action}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {log.user?.name || "Unknown user"} •{" "}
                    {formatDate(log.createdAt)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default TaskActivity;
