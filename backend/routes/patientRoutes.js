// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const { getPatients, getPatient, createPatient, editPatient, removePatient, searchPatient } = require('../controllers/patientController');

router.get('/', verifyToken, allowRoles(1, 2), getPatients);
router.get('/search', verifyToken, allowRoles(1, 2), searchPatient);
router.get('/:id', verifyToken, getPatient);
router.post('/', verifyToken, allowRoles(1, 2), createPatient);
router.put('/:id', verifyToken, editPatient);
router.delete('/:id', verifyToken, allowRoles(1), removePatient);

module.exports = router;