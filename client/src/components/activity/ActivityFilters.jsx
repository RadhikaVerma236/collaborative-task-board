import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FilterList from "@mui/icons-material/FilterList";

function ActivityFilters({ tasks, selectedTask, onTaskChange }) {
  return (
    <Box
      sx={{
        mb: 4,
        p: 2.5,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <FilterList
            sx={{
              fontSize: 17,
              color: "primary.main",
            }}
          />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          Filter Activity
        </Typography>
      </Box>

      <FormControl
        size="small"
        sx={{
          width: { xs: "100%", sm: 280 },
        }}
      >
        <InputLabel>Task</InputLabel>

        <Select
          value={selectedTask}
          label="Task"
          onChange={(event) => {
            onTaskChange(event.target.value);
          }}
        >
          <MenuItem value="all">
            All Tasks
          </MenuItem>

          {tasks.map((task) => (
            <MenuItem key={task._id} value={task._id}>
              {task.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ActivityFilters;