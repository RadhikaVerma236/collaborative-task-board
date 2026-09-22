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

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  const isMyTasksActive = location.pathname === "/my-tasks";
  const isActivityActive = location.pathname === "/activity";

  const navItems = [
    {
      label: "Board",
      path: "/board",
      icon: <DashboardOutlinedIcon fontSize="small" />,
      active: isBoardActive,
    },
    {
      label: "My Tasks",
      path: "/my-tasks",
      icon: <AssignmentOutlinedIcon fontSize="small" />,
      active: isMyTasksActive,
    },
    {
      label: "Activity",
      path: "/activity",
      icon: <HistoryOutlinedIcon fontSize="small" />,
      active: isActivityActive,
    },
  ];

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
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: 68,
          gap: 2,
          position: "relative",
        }}
      >
        {/* Logo */}
        <Box
          onClick={() => navigate("/board")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 16,
              boxShadow: "0 4px 10px rgba(79, 70, 229, 0.2)",
            }}
          >
            T
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 750,
              color: "text.primary",
              letterSpacing: "-0.4px",
              display: { xs: "none", sm: "block" },
            }}
          >
            TaskBoard
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            p: 0.5,
            gap: 0.5,
            borderRadius: 2.5,
            backgroundColor: "#F8FAFC",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
              sx={{
                minHeight: 38,
                px: 1.8,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 14,
                color: item.active ? "primary.main" : "text.secondary",
                backgroundColor: item.active ? "#FFFFFF" : "transparent",
                fontWeight: item.active ? 700 : 500,
                boxShadow: item.active
                  ? "0 1px 3px rgba(15, 23, 42, 0.08)"
                  : "none",

                "& .MuiButton-startIcon": {
                  mr: 0.7,
                },

                "&:hover": {
                  backgroundColor: item.active
                    ? "#FFFFFF"
                    : "rgba(15, 23, 42, 0.04)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Spacer */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {/* Desktop Profile */}
        <Button
          color="inherit"
          onClick={handleProfileOpen}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            px: 1,
            py: 0.6,
            minWidth: "auto",
            textTransform: "none",
            color: "text.primary",
            borderRadius: 2.5,

            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "primary.main",
              fontSize: "0.9rem",
              fontWeight: 700,
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
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {user?.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {user?.role}
            </Typography>
          </Box>

          <KeyboardArrowDownIcon
            sx={{
              fontSize: 19,
              color: "text.secondary",
              display: { xs: "none", lg: "block" },
            }}
          />
        </Button>

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
                minWidth: 270,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                overflow: "hidden",
              },
            },
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                backgroundColor: "primary.main",
                fontWeight: 700,
              }}
            >
              {getInitial()}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>
                {user?.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <MenuItem sx={{ py: 1.3 }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Name"
              secondary={user?.name || "Not available"}
            />
          </MenuItem>

          <MenuItem sx={{ py: 1.3 }}>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Email"
              secondary={user?.email || "Not available"}
            />
          </MenuItem>

          <MenuItem sx={{ py: 1.3 }}>
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
            sx={{
              py: 1.3,
              color: "error.main",
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={handleMobileMenuOpen}
          color="inherit"
          sx={{
            display: { xs: "flex", md: "none" },
            width: 42,
            height: 42,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
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
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 210,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
              },
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.path}
              selected={item.active}
              onClick={() => handleNavigation(item.path)}
              sx={{
                py: 1.2,
                gap: 1,

                "&.Mui-selected": {
                  backgroundColor: "rgba(79, 70, 229, 0.08)",
                  color: "primary.main",
                  fontWeight: 700,
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.12)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 34,
                  color: item.active ? "primary.main" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </MenuItem>
          ))}

          <Divider />

          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
              handleLogout();
            }}
            sx={{
              py: 1.2,
              color: "error.main",
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
