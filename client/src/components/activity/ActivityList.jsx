import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import ActivityItem from "./ActivityItem";

function ActivityList({ logs, loading }) {
  if (loading) {
    return (
      <Card
        sx={{
          minHeight: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          borderRadius: 2,
        }}
      >
        No activity yet.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        Recent Activity
      </Typography>

      <Card
        sx={{
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
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