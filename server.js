require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')

const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
