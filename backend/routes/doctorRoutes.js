// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getDoctors, getDoctor, createDoctor, editDoctor, removeDoctor } = require('../controllers/doctorController');

router.get('/', verifyToken, getDoctors);
router.get('/:id', verifyToken, getDoctor);
router.post('/', createDoctor);
router.put('/:id', verifyToken, editDoctor);
router.delete('/:id', verifyToken, removeDoctor);

module.exports = router;