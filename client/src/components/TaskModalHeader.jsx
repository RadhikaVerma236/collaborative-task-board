import { Box, DialogTitle, IconButton, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";
import Assignment from "@mui/icons-material/Assignment";

function TaskModalHeader({ task, onClose }) {
  return (
    <DialogTitle
      sx={{
        px: { xs: 2.5, sm: 4 },
        py: 2.5,
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Assignment />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {task ? "Edit Task" : "Create Task"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.4,
                display: { xs: "none", sm: "block" },
              }}
            >
              {task
                ? "Update the task details and assignment."
                : "Create and assign a new task to a team member."}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
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
  );
}

export default TaskModalHeader;