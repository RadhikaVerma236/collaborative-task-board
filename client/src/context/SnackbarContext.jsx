import { createContext, useContext, useState, useCallback, useMemo } from "react";
import AppSnackbar from "../components/AppSnackbar";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  const value = useMemo(
  () => ({
    showSnackbar,
  }),
  [showSnackbar],
);

  return (
    <SnackbarContext.Provider value={value}>
      {children}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}