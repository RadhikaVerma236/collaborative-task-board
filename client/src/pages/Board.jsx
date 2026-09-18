import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import { Box, Alert, Grid, Stack, Typography, Button } from "@mui/material";

import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import { getTasks, updateTaskStatus } from "../services/taskService";

function Board() {
  const [tasks, setTasks] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();

      console.log(
        "TASK IDS:",
        response.data.tasks.map((task) => task._id),
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();

    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED");
    });

    socket.on("taskUpdated", (updatedTask) => {
      console.log("SOCKET EVENT RECEIVED:", updatedTask);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        ),
      );

      setToastMessage(
        `Task "${updatedTask.title}" was moved to ${updatedTask.status}`,
      );

      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTaskCreated = (updatedTask) => {
    setTasks((currentTasks) => {
      const exists = currentTasks.some((task) => task._id === updatedTask._id);

      if (exists) {
        return currentTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        );
      }

      return [updatedTask, ...currentTasks];
    });
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setCreateModalOpen(true);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId),
    );
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {toastMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {toastMessage}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Task Board
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              Manage and track your team's tasks
            </Typography>
          </Box>

          {JSON.parse(localStorage.getItem("user"))?.role === "Admin" && (
            <Button
              variant="contained"
              onClick={() => {
                setSelectedTask(null);
                setCreateModalOpen(true);
              }}
              sx={{
                px: 2.5,
                py: 1.1,
              }}
            >
              + Create Task
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn
              title="To-Do"
              tasks={todoTasks}
              updateStatus={updateStatus}
              onEdit={handleEditTask}
              onDelete={handleTaskDeleted}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              updateStatus={updateStatus}
              onEdit={handleEditTask}
              onDelete={handleTaskDeleted}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
              updateStatus={updateStatus}
              onEdit={handleEditTask}
              onDelete={handleTaskDeleted}
            />
          </Grid>
        </Grid>
      </Box>

      <CreateTaskModal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setSelectedTask(null);
        }}
        onTaskCreated={handleTaskCreated}
        task={selectedTask}
      />
    </>
  );
}

export default Board;
