import { useEffect, useState, useMemo } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import Navbar from "../components/Navbar";
import TaskStatCard from "../components/TaskStatCard";
import MyTaskTable from "../components/MyTaskTable";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { getMyTasks } from "../services/taskService";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await getMyTasks();

        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch my tasks:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch your tasks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  const totalTasks = tasks.length;

  const { inProgressTasks, completedTasks, overdueTasks } = useMemo(() => {
  let inProgress = 0;
  let completed = 0;
  let overdue = 0;

  const currentDate = new Date();

  tasks.forEach((task) => {
    if (task.status === "in-progress") {
      inProgress++;
    }

    if (task.status === "completed") {
      completed++;
    }

    if (
      task.dueDate &&
      task.status !== "completed" &&
      new Date(task.dueDate) < currentDate
    ) {
      overdue++;
    }
  });

  return {
    inProgressTasks: inProgress,
    completedTasks: completed,
    overdueTasks: overdue,
  };
}, [tasks]);

const activeTasks = totalTasks - completedTasks;

const completionRate =
  totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

const inProgressRate =
  totalTasks > 0
    ? Math.round((inProgressTasks / totalTasks) * 100)
    : 0;

  const stats = [
    {
      title: "Total",
      value: totalTasks,
      subtitle: `${activeTasks} active`,
      detail: `${completedTasks} completed`,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      subtitle: "Currently being worked on",
      detail: `${inProgressRate}% of your total tasks`,
    },
    {
      title: "Overdue",
      value: overdueTasks,
      subtitle: "Tasks past their due date",
      detail:
        overdueTasks > 0
          ? `${overdueTasks} need your attention`
          : "You're all caught up",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Tasks you have finished",
      detail: `${completionRate}% completion rate`,
    },
  ];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleDelete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task._id !== taskId
      )
    );

    setSelectedTask(null);
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
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          {/* Page Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 34,
                borderRadius: 4,
                backgroundColor: "primary.main",
                flexShrink: 0,
              }}
            />

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 0.25,
                }}
              >
                My Tasks
              </Typography>

              <Typography color="text.secondary">
                Tasks assigned to you
              </Typography>
            </Box>
          </Box>

          {/* Loading */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                py: 6,
              }}
            >
              <CircularProgress size={28} />

              <Typography variant="body2" color="text.secondary">
                Loading your tasks…
              </Typography>
            </Box>
          )}

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2, mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Stats */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2.5,
                  width: "100%",
                  mb: 4,
                }}
              >
                {stats.map((stat) => (
                  <TaskStatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    subtitle={stat.subtitle}
                    detail={stat.detail}
                  />
                ))}
              </Box>

              {/* Task Table */}
              <MyTaskTable
                tasks={tasks}
                onTaskClick={handleTaskClick}
              />
            </>
          )}
        </Box>
      </Box>

      {/* Task Details */}
      <TaskDetailsModal
        open={Boolean(selectedTask)}
        task={selectedTask}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </>
  );
}

export default MyTasks;