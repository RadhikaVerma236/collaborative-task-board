import { useEffect, useMemo, useCallback, useState } from "react";
import { io } from "socket.io-client";
import { DragDropContext } from "@hello-pangea/dnd";

import { Box, Grid, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";

import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import { getTasks, updateTaskStatus } from "../services/taskService";
import TaskFilters from "../components/TaskFilters";
import { useSnackbar } from "../context/SnackbarContext";

function Board() {
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;

  const [tasks, setTasks] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const { showSnackbar } = useSnackbar();

  const isAdmin = useMemo(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "Admin";
    } catch {
      return false;
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await getTasks();

      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      showSnackbar("Failed to load tasks.", "error");
    }
  }, [showSnackbar]);

  const updateStatus = useCallback(async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update task:", error);
      showSnackbar("Failed to update task.", "error");
      throw error;
    }
  }, [showSnackbar]);

  const handleDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId) {
        return;
      }

      const previousTasks = tasks;

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === draggableId
            ? { ...task, status: destination.droppableId }
            : task,
        ),
      );

      try {
        await updateStatus(draggableId, destination.droppableId);
        showSnackbar("Task status updated successfully.", "success");
      } catch (error) {
        console.error("Failed to move task:", error);
        setTasks(previousTasks);
      }
    },
    [tasks, updateStatus, showSnackbar],
  );

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

      showSnackbar(
  `Task "${updatedTask.title}" was moved to ${updatedTask.status}.`,
  "info",
);
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchTasks, showSnackbar]);

  const handleTaskCreated = useCallback((updatedTask) => {
    setTasks((currentTasks) => {
      const exists = currentTasks.some(
        (task) => task._id === updatedTask._id,
      );

      if (exists) {
        return currentTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        );
      }

      return [updatedTask, ...currentTasks];
    });
  }, []);

  const handleEditTask = useCallback((task) => {
    setSelectedTask(task);
    setCreateModalOpen(true);
  }, []);

  const handleTaskDeleted = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId),
    );
  }, []);

  const assignedUsers = useMemo(() => {
    const users = new Map();

    tasks.forEach((task) => {
      const user = task.assignedTo;

      if (!user) {
        return;
      }

      const userId = user?._id || user;

      if (!users.has(userId)) {
        users.set(userId, user);
      }
    });

    return Array.from(users.values());
  }, [tasks]);

  const {
    filteredTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
  } = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        !search ||
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

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssigned
      );
    });

    return {
      filteredTasks: filtered,
      todoTasks: filtered.filter((task) => task.status === "todo"),
      inProgressTasks: filtered.filter(
        (task) => task.status === "in-progress",
      ),
      completedTasks: filtered.filter(
        (task) => task.status === "completed",
      ),
    };
  }, [
    tasks,
    searchText,
    statusFilter,
    priorityFilter,
    assignedFilter,
  ]);

  const clearFilters = useCallback(() => {
    setSearchText("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setAssignedFilter("all");
  }, []);

  const hasActiveFilters =
    searchText ||
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    assignedFilter !== "all";

  const handleCreateTask = useCallback(() => {
    setSelectedTask(null);
    setCreateModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setCreateModalOpen(false);
    setSelectedTask(null);
  }, []);

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 34,
                  borderRadius: 4,
                  backgroundColor: ACCENT,
                  flexShrink: 0,
                }}
              />

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
                  sx={{ mt: 0.25 }}
                >
                  Manage and track your team's tasks
                </Typography>
              </Box>
            </Box>

            {isAdmin && (
              <Button
                variant="contained"
                onClick={handleCreateTask}
                startIcon={<AddRoundedIcon />}
                disableElevation
                sx={{
                  px: 2.5,
                  py: 1.1,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: ACCENT,

                  "&:hover": {
                    backgroundColor: alpha(ACCENT, 0.88),
                  },
                }}
              >
                Create Task
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
            <Box
              sx={(theme) => ({
                mb: 3,
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2.5,
                py: 2,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: alpha(theme.palette.text.primary, 0.15),
                backgroundColor: alpha(theme.palette.text.primary, 0.02),
              })}
            >
              <SearchOffRoundedIcon
                sx={{ color: "text.secondary", fontSize: 20 }}
              />

              <Typography variant="body2" color="text.secondary">
                No tasks found matching your search or filters.
              </Typography>
            </Box>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container spacing={3.5}>
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
      </Box>

      <CreateTaskModal
        open={createModalOpen}
        onClose={handleCloseModal}
        onTaskCreated={handleTaskCreated}
        task={selectedTask}
      />
    </>
  );
}

export default Board;