// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const URL = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => {
  console.error('Database connection error:', error);
});

database.once('connected', () => {
  console.log('Connected to database');
});

// Set up routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
