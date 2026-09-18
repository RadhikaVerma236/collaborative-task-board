import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/board");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 900,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.9fr 1.1fr",
            },
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              p: 6,
              backgroundColor: "primary.main",
              color: "#FFFFFF",
              minHeight: 500,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                letterSpacing: "-0.5px",
              }}
            >
              Task Board
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 2,
                opacity: 0.95,
              }}
            >
              Work together. Stay organized.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                lineHeight: 1.8,
                maxWidth: 360,
              }}
            >
              Manage tasks, track progress, and collaborate with your team from
              one simple workspace.
            </Typography>
          </Box>

          {/* Login Section */}
          <CardContent
            sx={{
              p: { xs: 3, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: { md: 500 },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Welcome back
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Sign in to continue to your task board.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={2.5}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 1,
                    py: 1.4,
                    fontSize: "0.95rem",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 4 }}
            >
              Don't have an account?{" "}
              <Box
                component={Link}
                to="/signup"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
              </Box>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;
