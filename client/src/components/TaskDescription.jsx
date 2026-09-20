import {
  Box,
  Typography,
} from "@mui/material";

function TaskDescription({ task }) {
  return (
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
  );
}

export default TaskDescription;