import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import Assignment from "@mui/icons-material/Assignment";
import Flag from "@mui/icons-material/Flag";
import Person from "@mui/icons-material/Person";
import {
  createTask,
  updateTask,
} from "../services/taskService";

function CreateTaskModal({ open, onClose, onTaskCreated, task }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [open]);

  useEffect(() => {
  if (task && users.length > 0) {
    setFormData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "medium",
      assignedTo: task.assignedTo?._id || task.assignedTo || "",
    });
  }
}, [task, users]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

if (task) {
  response = await updateTask(task._id, formData);
} else {
  response = await createTask(formData);
}

  alert(
  task
    ? "Task updated successfully!"
    : "Task created successfully!"
);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        assignedTo: "",
      });

      onTaskCreated(response.data.task);
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignedTo: "",
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
    "& .MuiDialog-paper": {
      borderRadius: 3,
      overflow: "hidden",
    },
  }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 2.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              color="primary"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {task ? "Edit Task" : "New Task"}
            </Typography>

            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                mt: 0.5,
              }}
            >
              {task ? "Edit Task" : "Create Task"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {task
  ? "Update the task details and assignment."
  : "Create and assign a new task to a team member."}
            </Typography>
          </Box>

          <IconButton
            onClick={handleClose}
            sx={{
              flexShrink: 0,
              backgroundColor: "action.hover",

              "&:hover": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 3,
            backgroundColor: "#F8FAFC",
          }}
        >
          <Stack spacing={3}>
            {/* Task Details */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Assignment
                  sx={{
                    color: "primary.main",
                    fontSize: 21,
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700 }}
                >
                  Task Details
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={2.5}>
                  <TextField
                    label="Task Title"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Description"
                    name="description"
                    placeholder="Describe what needs to be done..."
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Stack>
              </Box>
            </Box>

            <Divider />

            {/* Assignment */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Person
                  sx={{
                    color: "primary.main",
                    fontSize: 21,
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700 }}
                >
                  Assignment
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={2.5}>
                  <TextField
                    select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="low">
                      Low
                    </MenuItem>

                    <MenuItem value="medium">
                      Medium
                    </MenuItem>

                    <MenuItem value="high">
                      High
                    </MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Assign To"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    fullWidth
                  >
                    <MenuItem value="">
                      Select a user
                    </MenuItem>

                    {users.map((user) => (
                      <MenuItem
                        key={user._id}
                        value={user._id}
                      >
                        {user.name} ({user.role})
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 1,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
           {task ? "Save Changes" : "Create Task"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default CreateTaskModal;