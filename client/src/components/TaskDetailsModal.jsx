import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  Close,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { deleteTask } from "../services/taskService";
import TaskActivity from "./TaskActivity";
import TaskTimeline from "./TaskTimeline";
import TaskPeople from "./TaskPeople";
import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";

function TaskDetailsModal({ open, task, onClose, onEdit, onDelete }) {
  const theme = useTheme();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const statusColors = {
    todo: theme.palette.status.todo,
    "in-progress": theme.palette.status.inProgress,
    completed: theme.palette.status.completed,
  };

  const statusLabels = {
    todo: "To-Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const priorityColors = {
    low: theme.palette.status.priorityLow,
    medium: theme.palette.status.priorityMedium,
    high: theme.palette.status.priorityHigh,
  };

  const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id);
      onDelete(task._id);

      setDeleteConfirmOpen(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              color="primary"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Task Details
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                wordBreak: "break-word",
              }}
            >
              {task?.title || "Loading task..."}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={onEdit}
              sx={{
                backgroundColor: "action.hover",

                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <Edit />
            </IconButton>

            <IconButton
              onClick={() => setDeleteConfirmOpen(true)}
              sx={{
                backgroundColor: "action.hover",

                "&:hover": {
                  backgroundColor: "error.light",
                  color: "error.main",
                },
              }}
            >
              <Delete />
            </IconButton>

            <IconButton
              onClick={onClose}
              sx={{
                backgroundColor: "action.hover",

                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <Close />
            </IconButton>
          </Stack>
        </Box>

        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 3,
            backgroundColor: "#F8FAFC",
          }}
        >
          {task ? (
            <Stack spacing={3}>
              {/* Description */}
             <TaskDescription task={task} />

              {/* Status + Priority */}
             <TaskStatus
              task={task}
              statusColors={statusColors}
              statusLabels={statusLabels}
              priorityColors={priorityColors}
              priorityLabels={priorityLabels}
            />

              <Divider />

              {/* People */}
             <TaskPeople task={task} />

              <Divider />

              <TaskTimeline task={task} formatDate={formatDate} />

              <TaskActivity open={open} task={task} />
            </Stack>
          ) : (
            <Box
              sx={{
                minHeight: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Unable to load task details.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Task?</DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>

          <Button variant="contained" color="error" onClick={handleDeleteTask}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskDetailsModal;
