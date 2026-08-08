// routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const { uploadReport, getPatientReports, downloadReport, removeReport } = require('../controllers/reportController');

router.post('/upload', verifyToken, allowRoles(1, 2), upload.single('report'), uploadReport);
router.get('/patient/:patientId', verifyToken, getPatientReports);
router.get('/:id/download', verifyToken, downloadReport);
router.delete('/:id', verifyToken, allowRoles(1, 2), removeReport);

module.exports = router;