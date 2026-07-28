// validators/scheduleValidator.js

const { body, validationResult } = require('express-validator');

const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

const scheduleValidation = [
  body('dayOfWeek')
    .isIn(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
    .withMessage('dayOfWeek must be one of MON, TUE, WED, THU, FRI, SAT, SUN'),
  body('startTime')
    .matches(timeFormat)
    .withMessage('startTime must be a valid time in HH:MM or HH:MM:SS format'),
  body('endTime')
    .matches(timeFormat)
    .withMessage('endTime must be a valid time in HH:MM or HH:MM:SS format'),
  body().custom((value) => {
    if (value.startTime && value.endTime && value.startTime >= value.endTime) {
      throw new Error('startTime must be earlier than endTime');
    }
    return true;
  })
];

const validateSchedule = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { scheduleValidation, validateSchedule };