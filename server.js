// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/GPS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const locationSchema = new mongoose.Schema({
  phoneNumber: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});

const Location = mongoose.model('Location', locationSchema);

app.use(cors());
app.use(express.json());

// Endpoint for receiving location updates
app.post('/api/location', async (req, res) => {
  const { phoneNumber, latitude, longitude } = req.body;

  const newLocation = new Location({
    phoneNumber,
    latitude,
    longitude,
    timestamp: new Date(),
  });

  await newLocation.save();

  res.json({ success: true, message: 'Location updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
