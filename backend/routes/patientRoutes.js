// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getPatients, getPatient, createPatient, editPatient, removePatient } = require('../controllers/patientController');

router.get('/', verifyToken, getPatients);
router.get('/:id', verifyToken, getPatient);
router.post('/', createPatient);
router.put('/:id', verifyToken, editPatient);
router.delete('/:id', verifyToken, removePatient);

module.exports = router;