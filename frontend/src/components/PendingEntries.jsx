import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, Pagination } from '@mui/material';
import { fetchData } from '../utils/api.js';
import { formatDate } from '../utils/dateUtils.js'; 
import { axiosInstance } from "../hooks/useAxios";

const PendingEntries = () => {
    const [pendingEntries, setPendingEntries] = useState([]);
    const [displayedEntries, setDisplayedEntries] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [page, setPage] = useState(1); // Pagination page starts from 1
    const [rowsPerPage] = useState(5); // Number of rows to display per page

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchData(); // Fetch all data
                const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                const filteredEntries = data.entries.filter(entry => 
                    entry.value === 0 && new Date(entry.date).toISOString().split('T')[0] === today
                );
                setPendingEntries(filteredEntries);
                setDisplayedEntries(filteredEntries.slice(0, rowsPerPage)); // Display first page
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, [rowsPerPage]);

    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setDisplayedEntries(pendingEntries.slice(startIndex, endIndex));
    }, [page, rowsPerPage, pendingEntries]);

    const handleEditClick = (id, value) => {
        setEditingId(id);
        setNewValue(value);
    };

    const handleSaveClick = async (id) => {
        try {
            await axiosInstance.patch(`/dwm_form/${id}`, { value: parseFloat(newValue) });
            // Re-fetch data after saving changes
            const data = await fetchData();
            const today = new Date().toISOString().split('T')[0];
            const filteredEntries = data.entries.filter(entry => 
                entry.value === 0 && new Date(entry.date).toISOString().split('T')[0] === today
            );
            setPendingEntries(filteredEntries);
            const startIndex = (page - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            setDisplayedEntries(filteredEntries.slice(startIndex, endIndex));
            setEditingId(null);
            setNewValue('');
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(pendingEntries.length / rowsPerPage);

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Typography variant="h5" gutterBottom>
                Pending Entries for Today
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Units</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedEntries.map((entry) => (
                            <TableRow key={entry._id}>
                                <TableCell>{entry.type}</TableCell>
                                <TableCell>{formatDate(new Date(entry.date))}</TableCell>
                                <TableCell>
                                    {editingId === entry._id ? (
                                        <TextField
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            type="number"
                                        />
                                    ) : (
                                        entry.value
                                    )}
                                </TableCell>
                                <TableCell>{entry.units}</TableCell>
                                <TableCell>
                                    {editingId === entry._id ? (
                                        <Button onClick={() => handleSaveClick(entry._id)} variant="contained" sx={{ background: "#B4BEDE" }}>
                                            Save
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(entry._id, entry.value)} variant="contained" sx={{ background: "#B4BEDE", borderColor:"#4C68C7" }}>
                                            Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default PendingEntries;
