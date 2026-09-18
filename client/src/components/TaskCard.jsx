import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";

function TaskCard({ task, updateStatus, onEdit, onDelete }) {
  const theme = useTheme();

  const [detailsOpen, setDetailsOpen] = useState(false);

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

  return (
    <>
      <Card
        onClick={() => setDetailsOpen(true)}
        sx={{
          mb: 2,
          backgroundColor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.2s ease",
          cursor: "pointer",

          "&:hover": {
            boxShadow: 3,
            transform: "translateY(-2px)",
            borderColor: "primary.main",
          },
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.4,
            }}
          >
            {task.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description || "No description provided"}
          </Typography>

          {/* Priority + Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 2.5,
            }}
          >
            <Chip
              label={`Priority: ${priorityLabels[task.priority]}`}
              size="small"
              sx={{
                backgroundColor: priorityColors[task.priority],
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            />

            <Chip
              label={statusLabels[task.status]}
              size="small"
              sx={{
                backgroundColor: statusColors[task.status],
                color: "#FFFFFF",
                fontWeight: 600,
                flexShrink: 0,
              }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Assigned User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Person
                sx={{
                  fontSize: 18,
                  color: "text.secondary",
                }}
              />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Assigned to
              </Typography>

              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
              >
                {task.assignedTo?.name || "Unassigned"}
              </Typography>
            </Box>
          </Box>

          {/* Change Status */}
          <Box onClick={(e) => e.stopPropagation()}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 0.75,
              }}
            >
              Change status
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                value={task.status}
                onChange={(e) => {
                  updateStatus(task._id, e.target.value);
                }}
              >
                <MenuItem value="todo">
                  To-Do
                </MenuItem>

                <MenuItem value="in-progress">
                  In Progress
                </MenuItem>

                <MenuItem value="completed">
                  Completed
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <TaskDetailsModal
        open={detailsOpen}
        task={task}
        onClose={() => setDetailsOpen(false)}
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task._id)}
      />
    </>
  );
}

export default TaskCard;