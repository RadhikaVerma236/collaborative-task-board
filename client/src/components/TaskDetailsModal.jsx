import { useState } from "react";
import {
  Box,
  Button,
  Chip,
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
  CalendarMonth,
  Close,
  Person,
  Flag,
  Update,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { deleteTask } from "../services/taskService";
import TaskActivity from "./TaskActivity";

function TaskDetailsModal({ open, task, onClose, onEdit, onDelete }) {
  console.log("DETAIL MODAL TASK:", task);
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
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Description
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color={task.description ? "text.primary" : "text.secondary"}
                    sx={{ lineHeight: 1.7 }}
                  >
                    {task.description || "No description provided."}
                  </Typography>
                </Box>
              </Box>

              {/* Status + Priority */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  Current Status
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={statusLabels[task.status]}
                        size="small"
                        sx={{
                          backgroundColor: statusColors[task.status],
                          color: "#FFFFFF",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Priority
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Chip
                        icon={
                          <Flag
                            sx={{
                              color: "#FFFFFF !important",
                              fontSize: 16,
                            }}
                          />
                        }
                        label={priorityLabels[task.priority]}
                        size="small"
                        sx={{
                          backgroundColor: priorityColors[task.priority],
                          color: "#FFFFFF",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* People */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  People
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "primary.main",
                        color: "#FFFFFF",
                      }}
                    >
                      <Person fontSize="small" />
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Assigned To
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {task.assignedTo?.name || "Unknown"}
                      </Typography>

                      {task.assignedTo?.email && (
                        <Typography variant="caption" color="text.secondary">
                          {task.assignedTo.email}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "secondary.main",
                        color: "#FFFFFF",
                      }}
                    >
                      <Person fontSize="small" />
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Created By
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {task.createdBy?.name || "Unknown"}
                      </Typography>

                      {task.createdBy?.email && (
                        <Typography variant="caption" color="text.secondary">
                          {task.createdBy.email}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* Dates */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  Timeline
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <CalendarMonth sx={{ color: "text.secondary" }} />

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Created
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatDate(task.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Update sx={{ color: "text.secondary" }} />

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatDate(task.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

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
