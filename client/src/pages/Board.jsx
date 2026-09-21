import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { DragDropContext } from "@hello-pangea/dnd";

import { Box, Alert, Grid, Stack, Typography, Button } from "@mui/material";

import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import { getTasks, updateTaskStatus } from "../services/taskService";
import TaskFilters from "../components/TaskFilters";

function Board() {
  const [tasks, setTasks] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");

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

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const previousTasks = [...tasks];

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task,
      ),
    );

    try {
      await updateStatus(draggableId, destination.droppableId);
    } catch (error) {
      console.error("Failed to move task:", error);

      setTasks(previousTasks);
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

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      task.title?.toLowerCase().includes(search) ||
      task.description?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    const assignedUserId =
      typeof task.assignedTo === "object"
        ? task.assignedTo?._id
        : task.assignedTo;

    const matchesAssigned =
      assignedFilter === "all" || assignedUserId === assignedFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssigned;
  });

  const assignedUsers = tasks
    .map((task) => task.assignedTo)
    .filter(Boolean)
    .filter(
      (user, index, array) =>
        array.findIndex(
          (item) => (item?._id || item) === (user?._id || user),
        ) === index,
    );

  const todoTasks = filteredTasks.filter((task) => task.status === "todo");

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress",
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed",
  );

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setAssignedFilter("all");
  };

  const hasActiveFilters =
    searchText ||
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    assignedFilter !== "all";

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

        <TaskFilters
          searchText={searchText}
          setSearchText={setSearchText}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          assignedFilter={assignedFilter}
          setAssignedFilter={setAssignedFilter}
          assignedUsers={assignedUsers}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredTasks.length === 0 && (
          <Alert
            severity="info"
            sx={{
              mb: 3,
              width: "100%",
            }}
          >
            No tasks found matching your search or filters.
          </Alert>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TaskColumn
                title="To-Do"
                tasks={todoTasks}
                updateStatus={updateStatus}
                onEdit={handleEditTask}
                onDelete={handleTaskDeleted}
                droppableId="todo"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TaskColumn
                title="In Progress"
                tasks={inProgressTasks}
                updateStatus={updateStatus}
                onEdit={handleEditTask}
                onDelete={handleTaskDeleted}
                droppableId="in-progress"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TaskColumn
                title="Completed"
                tasks={completedTasks}
                updateStatus={updateStatus}
                onEdit={handleEditTask}
                onDelete={handleTaskDeleted}
                droppableId="completed"
              />
            </Grid>
          </Grid>
        </DragDropContext>
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
