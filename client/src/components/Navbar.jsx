import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const getInitial = () => {
    if (!user?.name) return "?";

    return user.name.charAt(0).toUpperCase();
  };

  const isBoardActive = location.pathname === "/board";
  const isActivityActive = location.pathname === "/activity";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: 64,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            cursor: "pointer",
            letterSpacing: "-0.3px",
          }}
          onClick={() => navigate("/board")}
        >
          TaskBoard
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
          }}
        >
          {/* Board */}
          <Button
            color="inherit"
            onClick={() => navigate("/board")}
            sx={{
              px: 2,
              color: isBoardActive ? "primary.main" : "text.secondary",
              backgroundColor: isBoardActive
                ? "rgba(79, 70, 229, 0.08)"
                : "transparent",
              fontWeight: isBoardActive ? 600 : 500,

              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Board
          </Button>

          {/* Activity Log */}
          <Button
            color="inherit"
            onClick={() => navigate("/activity")}
            sx={{
              px: 2,
              color: isActivityActive ? "primary.main" : "text.secondary",
              backgroundColor: isActivityActive
                ? "rgba(79, 70, 229, 0.08)"
                : "transparent",
              fontWeight: isActivityActive ? 600 : 500,

              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Activity Log
          </Button>

          {/* Profile */}
          <Button
            color="inherit"
            onClick={handleProfileOpen}
            sx={{
              ml: 1,
              px: 1,
              minWidth: "auto",
              textTransform: "none",
              color: "text.primary",
              borderRadius: 2,
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                mr: 1,
                backgroundColor: "primary.main",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {getInitial()}
            </Avatar>

            <Box
              sx={{
                textAlign: "left",
                display: { xs: "none", lg: "block" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {user?.name}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {user?.role}
              </Typography>
            </Box>
          </Button>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 260,
                borderRadius: 2,
                boxShadow: 4,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Your account
            </Typography>
          </Box>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Name"
              secondary={user?.name || "Not available"}
            />
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Email"
              secondary={user?.email || "Not available"}
            />
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <BadgeIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Role"
              secondary={user?.role || "Not available"}
            />
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleProfileClose();
              handleLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            ml: "auto",
          }}
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem
            selected={isBoardActive}
            onClick={() => handleNavigation("/board")}
          >
            Board
          </MenuItem>

          <MenuItem
            selected={isActivityActive}
            onClick={() => handleNavigation("/activity")}
          >
            Activity Log
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
