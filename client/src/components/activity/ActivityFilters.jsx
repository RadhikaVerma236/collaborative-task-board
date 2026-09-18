import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
          gap: 1,
          mb: 1.5,
        }}
      >
        <FilterList
          sx={{
            fontSize: 20,
            color: "primary.main",
          }}
        />

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