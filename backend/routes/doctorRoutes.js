// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  editDoctor,
  removeDoctor,
  getDoctorSchedule,
  createScheduleSlot,
  removeScheduleSlot
} = require('../controllers/doctorController');

router.get('/', verifyToken, getDoctors);
router.get('/:id', verifyToken, getDoctor);
router.post('/', createDoctor);
router.put('/:id', verifyToken, editDoctor);
router.delete('/:id', verifyToken, allowRoles(1), removeDoctor);

router.get('/:id/schedule', verifyToken, getDoctorSchedule);
router.post('/:id/schedule', verifyToken, allowRoles(1, 2), createScheduleSlot);
router.delete('/:id/schedule/:scheduleId', verifyToken, allowRoles(1, 2), removeScheduleSlot);

module.exports = router;