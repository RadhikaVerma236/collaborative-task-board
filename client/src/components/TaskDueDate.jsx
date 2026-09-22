import { Box, Typography } from "@mui/material";
import CalendarToday from "@mui/icons-material/CalendarToday";

function TaskDueDate({ task, compact = false }) {
  if (!task?.dueDate) {
    return null;
  }

  const dueDate = new Date(task.dueDate);

  const isOverdue =
    dueDate < new Date() && task.status !== "completed";

  const formattedDate = dueDate.toLocaleDateString("en-US", {
    month: compact ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...(compact
          ? {}
          : {
              p: 2,
              backgroundColor: "#FFFFFF",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }),
      }}
    >
      <CalendarToday
        sx={{
          fontSize: compact ? 18 : 20,
          color: isOverdue ? "error.main" : "primary.main",
        }}
      />

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
        >
          {isOverdue ? "Overdue" : "Due Date"}
        </Typography>

        <Typography
          variant={compact ? "body2" : "body1"}
          fontWeight={600}
          color={isOverdue ? "error.main" : "text.primary"}
        >
          {formattedDate}
        </Typography>
      </Box>
    </Box>
  );
}

export default TaskDueDate;