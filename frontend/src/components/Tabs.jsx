import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableComponent from './TableComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import PendingEntries from './PendingEntries';
import SavedEntries from './SavedEntries';
import { Divider } from '@mui/material';



export default function BasicTabs() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', }}>
      <TabContext value={value}>
        <Box sx={{ marginTop:5, display: 'flex', justifyContent: 'flex-end' }}>
          <TabList onChange={handleChange} 
          sx={{background:"#fff", borderRadius:3}}
          aria-label="tabs example">
            <Tab label="Today's" value="1" />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tab label="Pending" value="2" />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tab label="Saved" value="3" />
          </TabList>

          <IconButton sx={{ ml: 2 }} aria-label="calendar">
          <CalendarMonthIcon />
        </IconButton>

        </Box>
        <TabPanel value="1">
          <TableComponent tab="today" />
        </TabPanel>
        <TabPanel value="2">
        <PendingEntries/>
        </TabPanel>
        <TabPanel value="3">
          <SavedEntries></SavedEntries>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
