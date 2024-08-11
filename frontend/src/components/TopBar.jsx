import React from 'react';
import { Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

function TopBar({ handleDrawerToggle, drawerWidth }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#f3f6fe",
        color: "#000",
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
      }}
    >
      <Toolbar sx={{ backgroundColor: '#f3f6fe', height: "89px" }}>
        {/* Drawer Toggle Button (Visible only on mobile) */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // Hide on larger screens
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: "#000", 
            textAlign: { xs: 'center', sm: 'left' }, // Center on mobile, left on larger screens
            ml: { sm: 2 } // Add margin-left on larger screens to avoid overlap
          }}
        >
          Forms
        </Typography>

        {/* Right-side Icons */}
        <Box sx={{ ml: 'auto' }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
