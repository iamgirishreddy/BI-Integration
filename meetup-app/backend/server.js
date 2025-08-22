const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (functions that run before your routes)
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON data from requests

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Meetup API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

  // Add this after your middleware
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);
