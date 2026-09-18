import { Box, Card, CardContent, Typography } from "@mui/material";
import { Timeline, Today } from "@mui/icons-material";

function ActivitySummary({ totalActivities, todayActivities }) {
  const summaryItems = [
    {
      label: "Total Activities",
      value: totalActivities,
      icon: <Timeline />,
    },
    {
      label: "Today's Activity",
      value: todayActivities,
      icon: <Today />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
        },
        gap: 2,
        mb: 4,
      }}
    >
      {summaryItems.map((item) => (
        <Card key={item.label}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2.5,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "primary.main",
                color: "#FFFFFF",
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {item.label}
              </Typography>

              <Typography
                variant="h5"
                sx={{ fontWeight: 700 }}
              >
                {item.value}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ActivitySummary;