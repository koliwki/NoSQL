const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Routes
app.use('/api', todoRoutes);
app.use('/api', userRoutes);

// Connexion à MongoDB
require('dotenv').config(); // Si vous utilisez un fichier .env

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Todolist_db';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Erreur de connexion à MongoDB :', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});