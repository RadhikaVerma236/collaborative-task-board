import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Assignment from "@mui/icons-material/Assignment";
import Person from "@mui/icons-material/Person";
import TaskModalHeader from "./TaskModalHeader";
import TaskFormFields from "./TaskFormFields";
import TaskAssignmentFields from "./TaskAssignmentFields";
import { createTask, updateTask } from "../services/taskService";
import { useSnackbar } from "../context/SnackbarContext";

function CreateTaskModal({ open, onClose, onTaskCreated, task }) {
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
    dueDate: "",
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
          },
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
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
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

      console.log("UPDATED TASK RESPONSE:", response.data.task);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        assignedTo: "",
        dueDate: "",
      });

      onTaskCreated(response.data.task);
      showSnackbar(
      task ? "Task updated successfully." : "Task created successfully.",
      "success",
    );
      onClose();
    } catch (error) {
      console.error(error);

     showSnackbar(
      error.response?.data?.message ||
        (task ? "Failed to update task." : "Failed to create task."),
      "error",
    ); 
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignedTo: "",
      dueDate: "",
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <TaskModalHeader task={task} onClose={handleClose} />

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          sx={(theme) => ({
            px: { xs: 2.5, sm: 5 },
            py: 4,
            backgroundColor: alpha(theme.palette.text.primary, 0.02),
          })}
        >
          <Stack spacing={3}>
            {/* Task Details */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  mb: 2,
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
                    backgroundColor: alpha(ACCENT, 0.1),
                  }}
                >
                  <Assignment
                    sx={{
                      color: ACCENT,
                      fontSize: 17,
                    }}
                  />
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Task Details
                </Typography>
              </Box>

              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <TaskFormFields
                  formData={formData}
                  handleChange={handleChange}
                />
              </Box>
            </Box>

            <Divider />

            {/* Assignment */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  mb: 2,
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
                    backgroundColor: alpha(ACCENT, 0.1),
                  }}
                >
                  <Person
                    sx={{
                      color: ACCENT,
                      fontSize: 17,
                    }}
                  />
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Assignment
                </Typography>
              </Box>

              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <TaskAssignmentFields
                  formData={formData}
                  handleChange={handleChange}
                  users={users}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 1.5,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{
              minWidth: 100,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              minWidth: 120,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: ACCENT,

              "&:hover": {
                backgroundColor: alpha(ACCENT, 0.88),
              },
            }}
          >
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default CreateTaskModal;