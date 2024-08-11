import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';

const DataEntryForm = () => {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [units, setUnits] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.post('/dwm_form', {
        type,
        value: parseFloat(value),
        units,
      });
      console.log('Data saved:', response.data);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Enter Today's Data
      </Typography>
      <TextField
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Units"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="KL">KL</MenuItem>
        <MenuItem value="%">%</MenuItem>
        <MenuItem value="Degrees Celsius">Degrees Celsius</MenuItem>
        <MenuItem value="Hours">Hours</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={isSaved}
        sx={{ marginTop: 2 }}
      >
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    </Container>
  );
};

export default DataEntryForm;
