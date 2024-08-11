import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Logo'; // Example logo component
import { leftNavbarItems } from '../constants/navbarItems';
import { useLocation } from 'react-router-dom'; // Your list of navbar items

const drawerWidth = 288;

function NavBar(props) {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const drawer = (
    <div>
      <Toolbar sx={{ height: "89px" }}>
        <Logo />
      </Toolbar>
      <Divider />
      <List>
        {leftNavbarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => navigate(item.route)}>
              <ListItemIcon
                sx={{color:"#fff"}}
              >{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} className={location.pathname === item.route ? 'active' : 'inactive'} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },  }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            background:"#252B3F" ,
            color:"#fff"
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
