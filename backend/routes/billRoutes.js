// routes/billRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const {
  getBills,
  getBill,
  getPatientBills,
  addBill,
  changeBillStatus,
  addPayment,
  getBillPayments
} = require('../controllers/billController');

router.get('/', verifyToken, allowRoles(1, 4), getBills);
router.get('/:id', verifyToken, getBill);
router.get('/patient/:patientId', verifyToken, getPatientBills);
router.post('/', verifyToken, allowRoles(1, 4), addBill);
router.put('/:id/status', verifyToken, allowRoles(1, 4), changeBillStatus);

router.post('/payments', verifyToken, allowRoles(1, 4), addPayment);
router.get('/:billId/payments', verifyToken, getBillPayments);

module.exports = router;