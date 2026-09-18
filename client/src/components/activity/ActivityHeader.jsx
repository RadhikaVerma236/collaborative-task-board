import { Box, Typography } from "@mui/material";

function ActivityHeader() {
  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 0.75,
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
  );
}

export default ActivityHeader;