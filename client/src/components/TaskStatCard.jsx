import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TaskStatCard({ title, value, subtitle, detail }) {
  const cardData = {
    Total: {
      icon: <AssignmentOutlinedIcon />,
      color: "#4F46E5",
      background: "#EEF2FF",
    },
    "In Progress": {
      icon: <AccessTimeOutlinedIcon />,
      color: "#F59E0B",
      background: "#FFFBEB",
    },
    Overdue: {
      icon: <WarningAmberOutlinedIcon />,
      color: "#EF4444",
      background: "#FEF2F2",
    },
    Completed: {
      icon: <CheckCircleIcon />,
      color: "#22C55E",
      background: "#F0FDF4",
    },
  };

  const currentCard = cardData[title];

  const isTotal = title === "Total";
  const isInProgress = title === "In Progress";
  const isCompleted = title === "Completed";
  const isOverdue = title === "Overdue";

  const percentage =
    isInProgress || isCompleted
      ? parseInt(detail, 10) || 0
      : 0;

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        minHeight: 190,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        backgroundColor: "background.paper",
        transition: "all 0.2s ease",
        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
          borderColor: currentCard.color,
        },
      }}
    >
      <CardContent
        sx={{
          px: 3,
          py: 2.5,
          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: currentCard.color,
              backgroundColor: currentCard.background,
            }}
          >
            {currentCard.icon}
          </Box>
        </Box>

        {/* Main number */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1,
            color: "text.primary",
            mb: 2,
          }}
        >
          {value}
        </Typography>

        {/* Total */}
        {isTotal && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
            }}
          >
            <Box
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: "action.hover",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Active
              </Typography>

              <Typography
                variant="body1"
                fontWeight={700}
              >
                {subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: "action.hover",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Completed
              </Typography>

              <Typography
                variant="body1"
                fontWeight={700}
              >
                {detail}
              </Typography>
            </Box>
          </Box>
        )}

        {/* In Progress */}
        {isInProgress && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.8,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Currently being worked on
              </Typography>

              <Typography
                variant="caption"
                fontWeight={700}
              >
                {percentage}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 7,
                borderRadius: 5,
                backgroundColor: "#FEF3C7",

                "& .MuiLinearProgress-bar": {
                  backgroundColor: currentCard.color,
                  borderRadius: 5,
                },
              }}
            />
          </Box>
        )}

        {/* Completed */}
        {isCompleted && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.8,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Completion rate
              </Typography>

              <Typography
                variant="caption"
                fontWeight={700}
              >
                {percentage}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 7,
                borderRadius: 5,
                backgroundColor: "#DCFCE7",

                "& .MuiLinearProgress-bar": {
                  backgroundColor: currentCard.color,
                  borderRadius: 5,
                },
              }}
            />
          </Box>
        )}

        {/* Overdue */}
        {isOverdue && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
            }}
          >
            <WarningAmberOutlinedIcon
              sx={{
                fontSize: 18,
                color: currentCard.color,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: "#B91C1C",
                fontWeight: 600,
              }}
            >
              {detail}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskStatCard;