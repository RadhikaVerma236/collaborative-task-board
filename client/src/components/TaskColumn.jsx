import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import {
  RadioButtonUnchecked,
  AccessTime,
  CheckCircle,
} from "@mui/icons-material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useTheme, alpha } from "@mui/material/styles";
import TaskCard from "./TaskCard";
import { useMemo } from "react";

function TaskColumn({
  title,
  tasks,
  updateStatus,
  onEdit,
  onDelete,
  droppableId,
}) {
  const theme = useTheme();

  const columnStyles = useMemo(
    () => ({
      "To-Do": {
        color: theme.palette.status.todo,
        icon: <RadioButtonUnchecked fontSize="small" />,
      },

      "In Progress": {
        color: theme.palette.status.inProgress,
        icon: <AccessTime fontSize="small" />,
      },

      Completed: {
        color: theme.palette.status.completed,
        icon: <CheckCircle fontSize="small" />,
      },
    }),
    [theme],
  );

  const currentStyle = columnStyles[title];

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 500,
        border: "1px solid",
        borderColor: "divider",
        borderTop: `4px solid ${currentStyle.color}`,
        backgroundColor: alpha(theme.palette.text.primary, 0.025),
        boxShadow: "none",
        transition: "box-shadow 0.2s ease",

        "&:hover": {
          boxShadow: `0 8px 24px -12px ${alpha(theme.palette.common.black, 0.3)}`,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentStyle.color,
                backgroundColor: alpha(currentStyle.color, 0.12),
              }}
            >
              {currentStyle.icon}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Box>

          <Chip
            label={tasks.length}
            size="small"
            sx={{
              backgroundColor: alpha(currentStyle.color, 0.12),
              color: currentStyle.color,
              fontWeight: 700,
              minWidth: 30,
            }}
          />
        </Box>

        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                minHeight: 380,
                borderRadius: 2,
                transition: "background-color 0.2s ease",
                backgroundColor: snapshot.isDraggingOver
                  ? alpha(currentStyle.color, 0.06)
                  : "transparent",
              }}
            >
              {tasks.length === 0 ? (
                <Box
                  sx={{
                    minHeight: 380,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: alpha(currentStyle.color, 0.5),
                      backgroundColor: alpha(currentStyle.color, 0.08),
                      mb: 1.5,
                      "& svg": { fontSize: 22 },
                    }}
                  >
                    {currentStyle.icon}
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    No tasks yet
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Tasks will appear here
                  </Typography>
                </Box>
              ) : (
                tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          updateStatus={updateStatus}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))
              )}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
}

export default TaskColumn;