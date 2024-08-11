const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware

// CORS setup to allow all origins
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/dwm_form', dataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
