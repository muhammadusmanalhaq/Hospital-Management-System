// routes/prescriptionRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const { prescriptionValidation, validatePrescription } = require('../validators/prescriptionValidator');
const { getPrescriptions, getPrescription, addPrescription, editPrescription, removePrescription } = require('../controllers/prescriptionController');

router.get('/', verifyToken, getPrescriptions);
router.get('/:id', verifyToken, getPrescription);
router.post('/', verifyToken, allowRoles(1, 2), prescriptionValidation, validatePrescription, addPrescription);
router.put('/:id', verifyToken, allowRoles(1, 2), editPrescription);
router.delete('/:id', verifyToken, allowRoles(1, 2), removePrescription);

module.exports = router;