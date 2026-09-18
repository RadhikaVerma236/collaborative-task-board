import { Box, Chip, Typography } from "@mui/material";
import { AccessTime, Update } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function ActivityItem({ log }) {
  const theme = useTheme();

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
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Update fontSize="small" />
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
            backgroundColor: theme.palette.action.hover,
            color: "text.secondary",
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
}

export default ActivityItem;