// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/protected-test', verifyToken, (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.get('/', (req, res) => {
  res.send('Hospital Management System API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});