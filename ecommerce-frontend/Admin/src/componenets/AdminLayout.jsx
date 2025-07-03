import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemText,
  Typography,
  Button,
  ListItem,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Inventory as ProductsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

const drawerWidth = 280;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [username, setUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUsername(user.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Category", icon: <CategoryIcon />, path: "/admin/category" },
    { text: "Products", icon: <ProductsIcon />, path: "/admin/products" },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand Section with Mobile Close Button */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: 80,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'rgba(255,255,255,0.2)',
              mr: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            AP
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '-0.025em',
            }}
          >
            Admin Panel
          </Typography>
        </Box>
        
        {/* Close button for mobile */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* User Info Section */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e0e7ff',
          background: '#f8fafc',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#3b82f6',
              mr: 2,
              fontSize: '0.875rem',
            }}
          >
            {getInitials(username)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#1e293b',
                fontSize: '0.875rem',
                truncate: true,
              }}
            >
              {username}
            </Typography>
            <Chip
              label="Administrator"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.75rem',
                bgcolor: '#dbeafe',
                color: '#1d4ed8',
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#64748b',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            pl: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Navigation
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  mb: 0.5,
                  mx: 1,
                  borderRadius: 2,
                  minHeight: 48,
                  backgroundColor: isActive ? '#3b82f6' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: isActive ? '#2563eb' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#1e293b',
                    transform: 'translateY(-1px)',
                    boxShadow: isActive 
                      ? '0 8px 25px rgba(59, 130, 246, 0.5)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e7ff' }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#ef4444',
            borderColor: '#fecaca',
            backgroundColor: '#fef2f2',
            py: 1.5,
            '&:hover': {
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderColor: '#ef4444',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
            },
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Mobile Menu Button - Floating */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: '#667eea',
            color: 'white',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              backgroundColor: '#5a6fd8',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Responsive Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#ffffff',
              borderRight: 'none',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#ffffff',
              borderRight: '1px solid #e0e7ff',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Enhanced Main Content */}
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100%",
          backgroundColor: "#FFF",
          padding: 0,
          paddingLeft: 0,
          marginRight: 17,
          width: "100vw",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;