import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

function TaskFilters({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  assignedFilter,
  setAssignedFilter,
  assignedUsers,
  clearFilters,
  hasActiveFilters,
}) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
      >
        <TextField
          label="Search tasks"
          placeholder="Search by title or description"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          sx={{ minWidth: { md: 170 } }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="todo">To-Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <TextField
          select
          label="Priority"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          sx={{ minWidth: { md: 160 } }}
        >
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
          select
          label="Assigned To"
          value={assignedFilter}
          onChange={(event) => setAssignedFilter(event.target.value)}
          sx={{ minWidth: { md: 180 } }}
        >
          <MenuItem value="all">All Users</MenuItem>

          {assignedUsers.map((user) => {
            const userId = user?._id || user;
            const userName =
              user?.name ||
              user?.username ||
              user?.email ||
              "Unknown User";

            return (
              <MenuItem key={userId} value={userId}>
                {userName}
              </MenuItem>
            );
          })}
        </TextField>

        {hasActiveFilters && (
          <Button
            variant="outlined"
            onClick={clearFilters}
            sx={{
              minWidth: 130,
              whiteSpace: "nowrap",
            }}
          >
            Clear Filters
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default TaskFilters;