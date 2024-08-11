import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar/NavBar';
import Tabs from './components/Tabs';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const drawerWidth = 288;

const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans, Arial, sans-serif',
  },
  // Add other theme customizations here if needed
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* TopBar */}
          <TopBar drawerWidth={drawerWidth} />
          
          {/* Left Drawer */}
          <NavBar />
          
          {/* Main Content */}
          <Box
            component="main"
            sx={{ flexGrow: 1, background:"#f3f6fe", p: 3, mt: 8 }} // Added margin-top to avoid overlap with AppBar
          >
            <Routes>
            <Route path="/" element={<Navigate to="/dwm-form" replace={true} />} />
              <Route path="/dwm-form" element={<Tabs />} />
              
              {/* Add more routes as needed */}
            </Routes>
            
            
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
