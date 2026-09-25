import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import { useTheme, alpha } from "@mui/material/styles";
import { memo, useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import TaskDueDate from "./TaskDueDate";

function TaskCard({ task, updateStatus, onEdit, onDelete }) {
  const theme = useTheme();

  const [detailsOpen, setDetailsOpen] = useState(false);

  const statusColors = {
    todo: theme.palette.status.todo,
    "in-progress": theme.palette.status.inProgress,
    completed: theme.palette.status.completed,
  };

  const priorityColors = {
    low: theme.palette.status.priorityLow,
    medium: theme.palette.status.priorityMedium,
    high: theme.palette.status.priorityHigh,
  };

  const priorityLabels = {
    low: "Low priority",
    medium: "Medium priority",
    high: "High priority",
  };

  const currentPriorityColor = priorityColors[task.priority];
  const currentStatusColor = statusColors[task.status];

  return (
    <>
      <Card
        onClick={() => setDetailsOpen(true)}
        sx={{
          mb: 1.5,
          height: 220,
          backgroundColor: "#FFFFFF",
          borderLeft: "4px solid",
          borderLeftColor: currentPriorityColor,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          transition: "box-shadow 0.18s ease, transform 0.18s ease",
          cursor: "pointer",
          boxSizing: "border-box",
          boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.06)}`,

          "&:hover": {
            boxShadow: `0 6px 20px -8px ${alpha(theme.palette.common.black, 0.25)}`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent
          sx={{
            pl: 1.75,
            pr: 1.5,
            py: 1.5,
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              mb: 0.5,
              minHeight: "2.6rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.title}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontSize: "0.8rem",
              lineHeight: 1.45,
              mb: 1.25,
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description || "No description provided"}
          </Typography>

          {/* Priority + Due Date + Assignee */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 1.25,
              minWidth: 0,
            }}
          >
            {/* Priority */}
            <Box
              title={priorityLabels[task.priority]}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.625,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: currentPriorityColor,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: currentPriorityColor,
                }}
              >
                {priorityLabels[task.priority].replace(" priority", "")}
              </Typography>
            </Box>

            {/* Due Date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <TaskDueDate task={task} compact />
            </Box>

            {/* Assignee */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                minWidth: 0,
              }}
            >
              <Person
                sx={{
                  fontSize: 15,
                  color: "text.disabled",
                  flexShrink: 0,
                }}
              />
              <Typography
                noWrap
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "text.secondary",
                }}
              >
                {task.assignedTo?.name || "Unassigned"}
              </Typography>
            </Box>
          </Box>

          {/* Status */}
          <Box onClick={(e) => e.stopPropagation()} sx={{ mt: "auto" }}>
            <FormControl fullWidth size="small">
              <Select
                value={task.status}
                onChange={(e) => {
                  updateStatus(task._id, e.target.value);
                }}
                sx={{
                  height: 32,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: currentStatusColor,
                  backgroundColor: alpha(currentStatusColor, 0.08),
                  borderRadius: 1,
                  transition: "background-color 0.15s ease",

                  "& fieldset": {
                    borderColor: "transparent",
                  },

                  "&:hover": {
                    backgroundColor: alpha(currentStatusColor, 0.14),
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: currentStatusColor,
                  },

                  "& .MuiSelect-select": {
                    py: 0.5,
                  },
                  "& .MuiSelect-icon": {
                    color: currentStatusColor,
                  },
                }}
              >
                <MenuItem value="todo">To-Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
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

export default memo(TaskCard);