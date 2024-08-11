const express = require('express');
const router = express.Router();
const DataEntry = require('../models/dataEntry');

// POST endpoint to save data
router.post('/', async (req, res) => {
  try {
    const { type, value, units } = req.body;

    if (!type || value === undefined || !units) {
      return res.status(400).json({ message: 'Type, value, and units are required' });
    }

    const newEntry = new DataEntry({ type, value, units });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET endpoint to fetch data
router.get('/', async (req, res) => {
  try {
    // Fetch all records from the DataEntry collection
    const data = await DataEntry.find();

    // Send the fetched data as a JSON response
    res.status(200).json({"entries": data});
  } catch (error) {
    // Handle errors by sending a 500 status with error details
    res.status(500).json({ message: 'Server error', error });
  }
});


// PATCH endpoint to edit existing entry
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({ message: 'Value is required' });
    }

    const updatedEntry = await DataEntry.findByIdAndUpdate(id, { value }, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Data entry not found' });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
