// validators/billValidator.js

const { body, validationResult } = require('express-validator');

const billCreationValidation = [
  body('patientId').notEmpty().withMessage('patientId is required').isInt().withMessage('patientId must be a number'),
  body('consultationCharge').optional().isFloat({ min: 0 }).withMessage('consultationCharge must be a non-negative number'),
  body('labCharge').optional().isFloat({ min: 0 }).withMessage('labCharge must be a non-negative number'),
  body('medicineCharge').optional().isFloat({ min: 0 }).withMessage('medicineCharge must be a non-negative number'),
  body('hospitalCharge').optional().isFloat({ min: 0 }).withMessage('hospitalCharge must be a non-negative number'),
  body().custom((value) => {
    const total = Number(value.consultationCharge || 0) + Number(value.labCharge || 0) +
                  Number(value.medicineCharge || 0) + Number(value.hospitalCharge || 0);
    if (total <= 0) {
      throw new Error('At least one charge amount is required and must be greater than 0');
    }
    return true;
  })
];

const paymentValidation = [
  body('billId').notEmpty().withMessage('billId is required').isInt().withMessage('billId must be a number'),
  body('amountPaid').notEmpty().withMessage('amountPaid is required').isFloat({ gt: 0 }).withMessage('amountPaid must be a positive number'),
  body('paymentMethod').isIn(['cash', 'card', 'upi', 'net_banking', 'insurance']).withMessage('Invalid payment method')
];

const validateBill = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { billCreationValidation, paymentValidation, validateBill };