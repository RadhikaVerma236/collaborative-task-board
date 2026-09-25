import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ActivityItem from "./ActivityItem";

function ActivityList({ logs, loading }) {
  if (loading) {
    return (
      <Card
        sx={{
          minHeight: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        <CircularProgress size={28} />

        <Typography variant="body2" color="text.secondary">
          Loading activity…
        </Typography>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Box
        sx={(theme) => ({
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
        <HistoryOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />

        <Typography variant="body2" color="text.secondary">
          No activity yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            width: 4,
            height: 22,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main,
            flexShrink: 0,
          })}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Recent Activity
        </Typography>
      </Box>

      <Card
        sx={{
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        {logs.map((log, index) => (
          <Box key={log._id}>
            <ActivityItem log={log} />

            {index < logs.length - 1 && <Divider />}
          </Box>
        ))}
      </Card>
    </Box>
  );
}

export default ActivityList;