import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Box, Stack, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

import ActivityHeader from "../components/activity/ActivityHeader";
import ActivitySummary from "../components/activity/ActivitySummary";
import ActivityList from "../components/activity/ActivityList";
import ActivityFilters from "../components/activity/ActivityFilters";
import Navbar from "../components/Navbar";

function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [cursorHistory, setCursorHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
const [selectedTask, setSelectedTask] = useState("all");
const [totalActivities, setTotalActivities] = useState(0);
const [todayActivities, setTodayActivities] = useState(0);

  const fetchLogs = useCallback(async (cursor = null) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      let url = "http://localhost:5000/api/activity?limit=5";

      if (selectedTask !== "all") {
      url += `&taskId=${selectedTask}`;
    }

      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(response.data.logs);
      setNextCursor(response.data.nextCursor);
      setHasMore(response.data.hasMore);
      setTotalActivities(response.data.totalActivities || 0);
      setTodayActivities(response.data.todayActivities || 0);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTask]);

    const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    fetchTasks();
  }, [fetchLogs, fetchTasks]);

 useEffect(() => {
  setPage(1);
  setCursorHistory([]);
  fetchLogs();
}, [fetchLogs]);

  const handleNext = () => {
    if (!nextCursor) return;

    setCursorHistory((currentHistory) => [
      ...currentHistory,
      nextCursor,
    ]);

    fetchLogs(nextCursor);
    setPage((currentPage) => currentPage + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return;

    if (page === 2) {
      fetchLogs();
      setCursorHistory([]);
      setPage(1);
      return;
    }

    const previousCursor =
      cursorHistory[cursorHistory.length - 2];

    fetchLogs(previousCursor);

    setCursorHistory((currentHistory) =>
      currentHistory.slice(0, -1)
    );

    setPage((currentPage) => currentPage - 1);
  };

  return (
    <>
      <Navbar />

      <Box
        sx={(theme) => ({
          minHeight: "calc(100vh - 68px)",
          backgroundColor: alpha(theme.palette.text.primary, 0.015),
        })}
      >
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            py: 4,
          }}
        >
          <ActivityHeader />

          <ActivitySummary
            totalActivities={totalActivities}
            todayActivities={todayActivities}
          />

          <ActivityFilters
            tasks={tasks}
            selectedTask={selectedTask}
            onTaskChange={setSelectedTask}
          />

          <ActivityList logs={logs} loading={loading} />

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2.5}
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handlePrevious}
              disabled={page === 1 || loading}
              startIcon={<ArrowBackRounded fontSize="small" />}
              sx={{ borderRadius: 2 }}
            >
              Previous
            </Button>

            <Box
              sx={(theme) => ({
                px: 1.75,
                py: 0.5,
                borderRadius: 5,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              })}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                Page {page}
              </Typography>
            </Box>

            <Button
              variant="contained"
              disableElevation
              onClick={handleNext}
              disabled={!hasMore || loading}
              endIcon={!loading ? <ArrowForwardRounded fontSize="small" /> : null}
              sx={{ borderRadius: 2 }}
            >
              {loading ? "Loading…" : "Next"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default ActivityLog;