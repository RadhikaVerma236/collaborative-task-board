import {
Box,
Chip,
Stack,
Typography,
} from "@mui/material";
import Flag from "@mui/icons-material/Flag";

function TaskStatus({
task,
statusColors,
statusLabels,
priorityColors,
priorityLabels,
}) {
return ( <Box>
<Typography
variant="subtitle1"
sx={{
fontWeight: 700,
mb: 1.5,
}}
>
Current Status </Typography>

  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <Box
      sx={{
        flex: 1,
        p: 2,
        backgroundColor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Status
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Chip
          label={statusLabels[task.status]}
          size="small"
          sx={{
            backgroundColor: statusColors[task.status],
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        />
      </Box>
    </Box>

    <Box
      sx={{
        flex: 1,
        p: 2,
        backgroundColor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Priority
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Chip
          icon={
            <Flag
              sx={{
                color: "#FFFFFF !important",
                fontSize: 16,
              }}
            />
          }
          label={priorityLabels[task.priority]}
          size="small"
          sx={{
            backgroundColor: priorityColors[task.priority],
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        />
      </Box>
    </Box>
  </Stack>
</Box>

);
}

export default TaskStatus;
