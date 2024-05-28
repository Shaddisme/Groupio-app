const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Frontend origin
  credentials: true
}));

// Start the server 
const PORT = process.env.PORT || 5000;

// Connect Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

  // Routes 
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

