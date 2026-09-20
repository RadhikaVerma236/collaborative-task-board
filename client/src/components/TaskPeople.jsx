import {
Box,
Stack,
Typography,
} from "@mui/material";
import Person from "@mui/icons-material/Person";

function TaskPeople({ task }) {
return ( <Box>
<Typography
variant="subtitle1"
sx={{
fontWeight: 700,
mb: 1.5,
}}
>
People 
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
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          color: "#FFFFFF",
        }}
      >
        <Person fontSize="small" />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Assigned To
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {task.assignedTo?.name || "Unknown"}
        </Typography>

        {task.assignedTo?.email && (
          <Typography variant="caption" color="text.secondary">
            {task.assignedTo.email}
          </Typography>
        )}
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
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "secondary.main",
          color: "#FFFFFF",
        }}
      >
        <Person fontSize="small" />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Created By
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {task.createdBy?.name || "Unknown"}
        </Typography>

        {task.createdBy?.email && (
          <Typography variant="caption" color="text.secondary">
            {task.createdBy.email}
          </Typography>
        )}
      </Box>
    </Box>
  </Stack>
</Box>

);
}

export default TaskPeople;
