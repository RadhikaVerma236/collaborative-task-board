import { Box, Typography } from "@mui/material";

function ActivityHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 4,
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 34,
          borderRadius: 4,
          backgroundColor: "primary.main",
          flexShrink: 0,
        }}
      />

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.25,
          }}
        >
          All Activity
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Track changes and updates across your task board.
        </Typography>
      </Box>
    </Box>
  );
}

export default ActivityHeader;