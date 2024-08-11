import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { formatDate } from '../utils/dateUtils.js';
import { Typography, Pagination } from '@mui/material';
import useAxios, { axiosInstance } from '../hooks/useAxios';


export default function TableComponent({ tab }) {
  const { data, loading, error, setData } = useAxios('/dwm_form');

  // Pagination states
  const [page, setPage] = React.useState(1);
  const [rowsPerPage] = React.useState(5);

  // Filter data to show only today's entries
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const rows = data && data.entries ? data.entries.filter(entry => entry.date.startsWith(today)) : [];

  // Slice data for the current page
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Function to handle changes in the value input field
  const handleValueChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].value = event.target.value;
    // No need to call setData here; instead, handle changes directly in the submission
  };

  // Function to handle form submission
  const handleSubmit = async (index) => {
    const row = rows[(page - 1) * rowsPerPage + index]; // Adjust index based on page
    try {
      await axiosInstance.patch(`/dwm_form/${row._id}`, { value: row.value });
      alert('Value updated successfully!');
      // Re-fetch data after saving changes
      const response = await axiosInstance.get('/dwm_form');
      setData(response.data);
    } catch (err) {
      console.error(err);
     // alert('Error updating value');
    }
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Render loading, error, or the table based on the state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h5" gutterBottom>
        DWM Form - Today
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Values</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{formatDate(new Date(row.date))}</TableCell>
                <TableCell>
                  {tab === 'today' ? (
                    <TextField
                      value={row.value}
                      onChange={(event) => handleValueChange(index, event)}
                      disabled={row.value ? true : false}
                      size="small"
                    />
                  ) : (
                    row.value
                  )}
                </TableCell>
                <TableCell>{row.units}</TableCell>
                <TableCell>
                  {tab === 'today' ? (
                    <Button
                      variant="contained"
                      sx={{ background: "#252B3F" }}
                      onClick={() => handleSubmit(index)}
                      disabled={Boolean(row.value)}
                    >
                      Submit
                    </Button>
                  ) : tab === 'saved' ? (
                    <Button variant="contained" sx={{ background: "#252B3F" }}>
                      Edit
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
