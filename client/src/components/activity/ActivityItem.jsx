import { Box, Chip, Typography } from "@mui/material";
import AccessTime from "@mui/icons-material/AccessTime";
import Update from "@mui/icons-material/Update";
import AddCircleOutline from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutlineOutlined";
import SwapHorizOutlined from "@mui/icons-material/SwapHorizOutlined";
import PersonOutline from "@mui/icons-material/PersonOutlined";
import { useTheme } from "@mui/material/styles";

// Derives an icon + color from the action text so the feed communicates
// what happened at a glance, instead of every row looking identical.
function getActivityVisual(action = "", theme) {
  const text = action.toLowerCase();

  if (text.includes("delet")) {
    return { icon: <DeleteOutline fontSize="small" />, color: theme.palette.error.main };
  }
  if (text.includes("complet")) {
    return { icon: <CheckCircleOutline fontSize="small" />, color: theme.palette.status.completed };
  }
  if (text.includes("assign")) {
    return { icon: <PersonOutline fontSize="small" />, color: theme.palette.primary.main };
  }
  if (text.includes("mov") || text.includes("status") || text.includes("progress")) {
    return { icon: <SwapHorizOutlined fontSize="small" />, color: theme.palette.status.inProgress };
  }
  if (text.includes("creat")) {
    return { icon: <AddCircleOutline fontSize="small" />, color: theme.palette.primary.main };
  }

  return { icon: <Update fontSize="small" />, color: theme.palette.primary.main };
}

function ActivityItem({ log }) {
  const theme = useTheme();
  const { icon, color } = getActivityVisual(log.action, theme);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2.5,
        transition: "background-color 0.2s ease",

        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {/* Activity Icon */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: color,
          color: theme.palette.common.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      {/* Activity Content */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* User + Time */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
            }}
          >
            {log.user?.name || "Unknown user"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            <AccessTime
              sx={{
                fontSize: 15,
                color: "text.secondary",
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {new Date(log.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Action */}
        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.primary",
            lineHeight: 1.6,
          }}
        >
          {log.action}
        </Typography>

        {/* Task */}
        <Chip
          label={`Task: ${log.task?.title || "Unknown task"}`}
          size="small"
          sx={{
            mt: 1.25,
            backgroundColor: "action.hover",
            color: "text.secondary",
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
}

export default ActivityItem;