// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const { getPatients, getPatient, createPatient, editPatient, removePatient } = require('../controllers/patientController');

router.get('/', verifyToken, allowRoles(1, 2), getPatients);
router.get('/:id', verifyToken, getPatient);
router.post('/', createPatient);
router.put('/:id', verifyToken, editPatient);
router.delete('/:id', verifyToken, allowRoles(1), removePatient);

module.exports = router;