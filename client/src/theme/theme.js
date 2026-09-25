import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#15304B",
    },

    secondary: {
      main: "#64748B",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },

    status: {
      todo: "#64748B",
      inProgress: "#F59E0B",
      completed: "#22C55E",
 
    todoBackground: "#F1F5F9",
    inProgressBackground: "#FFFBEB",
    completedBackground: "#F0FDF4",

    priorityLow: "#16A34A",
  priorityMedium: "#7C3AED",
  priorityHigh: "#DC2626",
   },

  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      fontSize: "0.875rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#F8FAFC",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;