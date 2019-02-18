import { check } from "express-validator/check";

export const validateRegisterInput = [
  check('firstName', 'First Name cannot be empty').trim().isLength({min: 1}),
  check('lastName', 'Last Name cannot be empty').trim().isLength({min: 1}),
  check('password', 'Password must be a least 3 characters').isLength({ min: 3 }),
  check('email' , 'Invalid Email').isEmail(),
  check('confirmPassword', 'Passwords should match')
    .exists()
    .custom((value, { req }) => value === req.body.password)
];

export const validateLoginInput = [
  check('password', 'Password cannot be empty').isLength({ min: 1 }),
  check('email').isEmail(),
];