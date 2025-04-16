const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Email Schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model('Email', emailSchema);

// Routes
app.post('/api/emails', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const newEmail = new Email({ email });
    await newEmail.save();
    
    res.status(201).json({ message: 'Email saved successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.get('/api/ping', async (req, res) => {
    try {
      res.json("pon");
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// Endpoint for n8n
app.get('/api/n8n/emails', async (req, res) => {
  try {
    console.log('Received request for n8n emails');
    const emails = await Email.find().select('email -_id');
    const emailList = emails.map(item => item.email);
    console.log(`Returning ${emailList.length} emails`);
    res.json({ emails: emailList });
  } catch (error) {
    console.error('Error in n8n emails endpoint:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Serve index.html for all other routes (for SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Export the Express API
module.exports = app; 