import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
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
import { alpha, useTheme } from "@mui/material/styles";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Add this to your index.html <head> (or global CSS @import) once,
// to load the wordmark's display typeface:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true">
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet">
const WORDMARK_FONT = "'Fraunces', 'Georgia', serif";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;

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

  // --- Sliding active-tab indicator ---
  const navContainerRef = useRef(null);
  const navButtonRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const recalcIndicator = useCallback(() => {
    const activeItem = navItems.find((item) => item.active);
    const node = activeItem && navButtonRefs.current[activeItem.path];
    const container = navContainerRef.current;

    if (node && container) {
      const nodeRect = node.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: nodeRect.left - containerRect.left,
        width: nodeRect.width,
        opacity: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useLayoutEffect(() => {
    recalcIndicator();
  }, [recalcIndicator]);

  useEffect(() => {
    window.addEventListener("resize", recalcIndicator);
    return () => window.removeEventListener("resize", recalcIndicator);
  }, [recalcIndicator]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: alpha(theme.palette.text.primary, 0.08),
      })}
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
            gap: 1.4,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {/* Abstract mark: three columns, echoing the board itself */}
          <Box
            component="svg"
            viewBox="0 0 28 24"
            sx={{ width: 26, height: 22, flexShrink: 0 }}
          >
            <rect x="1" y="10" width="6" height="14" rx="3" fill={ACCENT} />
            <rect x="11" y="4" width="6" height="20" rx="3" fill={ACCENT} />
            <rect
              x="21"
              y="13"
              width="6"
              height="11"
              rx="3"
              fill={alpha(ACCENT, 0.4)}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontFamily: WORDMARK_FONT,
              fontWeight: 600,
              color: "text.primary",
              letterSpacing: "-0.3px",
              display: { xs: "none", sm: "block" },
            }}
          >
            TaskBoard
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          ref={navContainerRef}
          sx={(theme) => ({
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            p: 0.5,
            gap: 0.5,
            borderRadius: 2.5,
            backgroundColor: alpha(theme.palette.text.primary, 0.03),
          })}
        >
          {/* Sliding indicator, positioned behind the active button */}
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 4,
              bottom: 4,
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
              borderRadius: 2,
              backgroundColor: "background.paper",
              boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
              transition:
                "left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease",
              zIndex: 0,
            })}
          />

          {navItems.map((item) => (
            <Button
              key={item.path}
              ref={(el) => {
                navButtonRefs.current[item.path] = el;
              }}
              color="inherit"
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
              sx={(theme) => ({
                position: "relative",
                zIndex: 1,
                minHeight: 38,
                px: 1.8,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 14,
                color: item.active ? ACCENT : "text.secondary",
                backgroundColor: "transparent",
                fontWeight: item.active ? 700 : 500,
                boxShadow: "none",

                "& .MuiButton-startIcon": {
                  mr: 0.7,
                },

                "&:hover": {
                  backgroundColor: item.active
                    ? "transparent"
                    : alpha(theme.palette.text.primary, 0.04),
                },
              })}
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
            sx={(theme) => ({
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${ACCENT}, ${alpha(ACCENT, 0.65)})`,
              color: "#FFFFFF",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 3.5px ${alpha(ACCENT, 0.35)}`,
            })}
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
              transition: "transform 0.2s ease",
              transform: Boolean(profileAnchor)
                ? "rotate(180deg)"
                : "rotate(0deg)",
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
              sx: (theme) => ({
                mt: 1,
                minWidth: 270,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: `0 12px 30px ${alpha(theme.palette.common.black, 0.14)}`,
                overflow: "hidden",
              }),
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
                background: `linear-gradient(135deg, ${ACCENT}, ${alpha(ACCENT, 0.65)})`,
                color: "#FFFFFF",
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
              sx: (theme) => ({
                mt: 1,
                minWidth: 210,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: `0 12px 30px ${alpha(theme.palette.common.black, 0.14)}`,
              }),
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
                  backgroundColor: alpha(ACCENT, 0.08),
                  color: ACCENT,
                  fontWeight: 700,
                },

                "&.Mui-selected:hover": {
                  backgroundColor: alpha(ACCENT, 0.12),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 34,
                  color: item.active ? ACCENT : "text.secondary",
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
