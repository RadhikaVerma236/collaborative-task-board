import { MenuItem, Stack, TextField } from "@mui/material";

function TaskAssignmentFields({ formData, handleChange, users }) {
  return (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Stack>

      <TextField
        select
        label="Assign To"
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        required
        fullWidth
        helperText="Select the team member responsible for this task"
      >
        <MenuItem value="">Select a user</MenuItem>

        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name} ({user.role})
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default TaskAssignmentFields;
