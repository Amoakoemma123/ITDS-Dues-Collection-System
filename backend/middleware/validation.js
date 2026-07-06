const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation error handler
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * User registration validation
 */
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Username must be between 3 and 100 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Full name must be between 2 and 255 characters'),
  body('phone_number')
    .optional()
    .trim()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('role_id')
    .isInt({ min: 1 })
    .withMessage('Please provide a valid role ID'),
  handleValidationErrors
];

/**
 * Login validation
 */
const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

/**
 * Student registration validation
 */
const validateStudentRegistration = [
  body('index_number')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Index number must be between 5 and 50 characters'),
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Full name must be between 2 and 255 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  // Note: phone_number removed from students table - not required
  body('level')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Level is required'),
  body('program')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Program must be between 2 and 100 characters'),
  body('course_id')
    .isInt({ min: 1 })
    .withMessage('Please provide a valid course ID'),
  handleValidationErrors
];

/**
 * Payment recording validation (for physical payments)
 */
const validatePaymentRecording = [
  body('student_id')
    .isInt({ min: 1 })
    .withMessage('Please provide a valid student ID'),
  body('course_id')
    .isInt({ min: 1 })
    .withMessage('Please provide a valid course ID'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('payment_mode')
    .isIn(['Cash', 'Mobile Money'])
    .withMessage('Payment mode must be either "Cash" or "Mobile Money"'),
  body('payment_date')
    .optional()
    .isISO8601()
    .withMessage('Payment date must be a valid date'),
  body('receipt_number')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Receipt number must be between 5 and 255 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),
  handleValidationErrors
];

/**
 * Legacy payment validation (kept for backward compatibility)
 */
const validatePayment = validatePaymentRecording;

/**
 * Course validation
 */
const validateCourse = [
  body('code')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Course code must be between 2 and 50 characters'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Course name must be between 2 and 255 characters'),
  body('level')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Level is required'),
  body('program')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Program must be between 2 and 100 characters'),
  body('dues_amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Dues amount must be a positive number'),
  handleValidationErrors
];

/**
 * ID parameter validation
 */
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid ID parameter'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateLogin,
  validateStudentRegistration,
  validatePayment,
  validatePaymentRecording,
  validateCourse,
  validateId
};

