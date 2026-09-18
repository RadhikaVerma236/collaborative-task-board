import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  Update,
} from "@mui/icons-material";

function TaskTimeline({ task, formatDate }) {
  return (
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
  );
}

export default TaskTimeline;