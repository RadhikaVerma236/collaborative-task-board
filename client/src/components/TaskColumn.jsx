import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import {
  RadioButtonUnchecked,
  AccessTime,
  CheckCircle,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks, updateStatus, onEdit, onDelete }) {
  const theme = useTheme();

  const columnStyles = {
    "To-Do": {
      color: theme.palette.status.todo,
      background: theme.palette.status.todoBackground,
      icon: <RadioButtonUnchecked fontSize="small" />,
    },

    "In Progress": {
      color: theme.palette.status.inProgress,
      background: theme.palette.status.inProgressBackground,
      icon: <AccessTime fontSize="small" />,
    },

    Completed: {
      color: theme.palette.status.completed,
      background: theme.palette.status.completedBackground,
      icon: <CheckCircle fontSize="small" />,
    },
  };

  const currentStyle = columnStyles[title];

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 500,
        border: "1px solid",
        borderColor: "divider",
        borderTop: `4px solid ${currentStyle.color}`,
        backgroundColor: currentStyle.background,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentStyle.color,
                backgroundColor: "#FFFFFF",
              }}
            >
              {currentStyle.icon}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Box>

          <Chip
            label={tasks.length}
            size="small"
            sx={{
              backgroundColor: currentStyle.color,
              color: "#FFFFFF",
              fontWeight: 600,
              minWidth: 30,
            }}
          />
        </Box>

        {tasks.length === 0 ? (
          <Box
            sx={{
              minHeight: 380,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              No tasks yet
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Tasks will appear here
            </Typography>
          </Box>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              updateStatus={updateStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default TaskColumn;
