// validators/appointmentValidator.js

const { body, validationResult } = require('express-validator');

const appointmentValidation = [
  body('patientId').notEmpty().withMessage('patientId is required').isInt().withMessage('patientId must be a number'),
  body('doctorId').notEmpty().withMessage('doctorId is required').isInt().withMessage('doctorId must be a number'),
  body('appointmentDate').notEmpty().withMessage('appointmentDate is required').isISO8601().withMessage('appointmentDate must be a valid date (YYYY-MM-DD)'),
  body('appointmentTime').notEmpty().withMessage('appointmentTime is required')
];

const validateAppointment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { appointmentValidation, validateAppointment };