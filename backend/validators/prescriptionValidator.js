// validators/prescriptionValidator.js

const { body, validationResult } = require('express-validator');

const prescriptionValidation = [
  body('appointmentId').notEmpty().withMessage('appointmentId is required').isInt().withMessage('appointmentId must be a number'),
  body('medicines').custom((value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        throw new Error('medicines list cannot be empty');
      }
    } else if (typeof value === 'string') {
      if (value.trim().length === 0) {
        throw new Error('medicines cannot be empty');
      }
    } else {
      throw new Error('medicines is required');
    }
    return true;
  })
];

const validatePrescription = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { prescriptionValidation, validatePrescription };