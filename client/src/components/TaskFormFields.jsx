import { Stack, TextField } from "@mui/material";

function TaskFormFields({ formData, handleChange }) {
  return (
    <Stack spacing={2.5}>
      <TextField
        label="Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        placeholder="Enter task title"
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={4}
        placeholder="Describe what needs to be done..."
      />
    </Stack>
  );
}

export default TaskFormFields;