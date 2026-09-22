import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  TableCell,
  TableRow,
} from "@mui/material";

import TaskDueDate from "./TaskDueDate";
import ReusableTable from "./ReusableTable";

function MyTaskTable({ tasks, onTaskClick }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        task.title?.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchText, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchText || statusFilter !== "all" || priorityFilter !== "all";

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const statusLabels = {
    todo: "To-Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const statusColors = {
    todo: "default",
    "in-progress": "warning",
    completed: "success",
  };

  const priorityColors = {
    low: "success",
    medium: "warning",
    high: "error",
  };

  const columns = ["Task", "Priority", "Status", "Due Date", "Created By"];

  const renderTaskRow = (task) => (
    <TableRow
      key={task._id}
      hover
      onClick={() => onTaskClick(task)}
      sx={{
        cursor: "pointer",
        transition: "background-color 0.15s ease",

        "&:hover": {
          backgroundColor: "#F8FAFC",
        },

        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell
        sx={{
          py: 2,
          minWidth: 280,
        }}
      >
        <Typography variant="body1" fontWeight={700} color="text.primary">
          {task.title}
        </Typography>
      </TableCell>

      <TableCell>
        <Chip
          label={
            task.priority
              ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
              : "—"
          }
          color={priorityColors[task.priority] || "default"}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 600,
            minWidth: 72,
          }}
        />
      </TableCell>

      <TableCell>
        <Chip
          label={statusLabels[task.status] || task.status}
          color={statusColors[task.status] || "default"}
          size="small"
          sx={{
            fontWeight: 600,
          }}
        />
      </TableCell>

      <TableCell
        sx={{
          minWidth: 145,
          height: 72,
          verticalAlign: "middle",
        }}
      >
        {task.dueDate ? (
          <TaskDueDate task={task} compact />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No due date
          </Typography>
        )}
      </TableCell>

      <TableCell
        sx={{
          minWidth: 150,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {task.createdBy?.name || task.createdBy?.email || "—"}
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2.5,
          backgroundColor: "background.paper",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
            sx={{
              minWidth: { md: 170 },
            }}
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
            sx={{
              minWidth: { md: 160 },
            }}
          >
            <MenuItem value="all">All Priorities</MenuItem>

            <MenuItem value="low">Low</MenuItem>

            <MenuItem value="medium">Medium</MenuItem>

            <MenuItem value="high">High</MenuItem>
          </TextField>

          {hasActiveFilters && (
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{
                minWidth: 120,
                whiteSpace: "nowrap",
              }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
      </Box>

      <ReusableTable
        columns={columns}
        rows={filteredTasks}
        renderRow={renderTaskRow}
        emptyMessage="No tasks found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your search or filters."
            : "You don't have any tasks assigned yet."
        }
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        minWidth={800}
      />
    </Box>
  );
}

export default MyTaskTable;
