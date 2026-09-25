import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);

      showSnackbar("Account created successfully.", "success");

      navigate("/login");
    } catch (error) {
      showSnackbar(
      error.response?.data?.message || "Signup failed.",
      "error"
    );
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
              minHeight: 560,
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
              Bring your team together.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                lineHeight: 1.8,
                maxWidth: 360,
              }}
            >
              Create your account and start managing tasks, tracking progress,
              and collaborating with your team.
            </Typography>
          </Box>

          {/* Signup Section */}
          <CardContent
            sx={{
              p: { xs: 3, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: { md: 560 },
            }}
          >
            <Box sx={{ mb: 3.5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Create your account
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Get started with your task board workspace.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSignup}>
              <Stack spacing={2.2}>
                <TextField
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  select
                  name="role"
                  label="Role"
                  value={formData.role}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Member">Member</MenuItem>

                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 0.5,
                    py: 1.4,
                    fontSize: "0.95rem",
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 3.5 }}
            >
              Already have an account?{" "}
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Box>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Signup;
