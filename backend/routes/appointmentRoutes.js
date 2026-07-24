// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getAppointments, getAppointment, addAppointment, editAppointment, removeAppointment } = require('../controllers/appointmentController');

router.get('/', verifyToken, getAppointments);
router.get('/:id', verifyToken, getAppointment);
router.post('/', verifyToken, addAppointment);
router.put('/:id', verifyToken, editAppointment);
router.delete('/:id', verifyToken, removeAppointment);

module.exports = router;