import { check } from "express-validator/check";

const user = [
  check('username', 'Username cannot be empty').trim().isLength({ min: 1 }),
  check('address', 'Address cannot be empty').trim().isLength({ min: 1 }),
  check('phone', 'Invalid Phone number').trim().isNumeric(),
  check('email', 'Invalid Email').isEmail(),
];

const validate = {
  register: user.concat([
    check('password', 'Password must be a least 3 characters').isLength({ min: 3 }),
    check('confirmPassword', 'Passwords should match')
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ]),
  login : [
    check('password', 'Password cannot be empty').isLength({ min: 1 }),
    check('email', 'Invalid Email').isEmail(),
  ],
  record : [
    check('name', 'Record Name cannot be empty.').trim().isLength({ min: 1 }),
    check('artistName', 'Artist Name cannot be empty.').trim().isLength({ min: 1 }),
    check('description', 'Description cannot be empty.').trim().isLength({ min: 1 }),
    check('price', 'Price should be a number.').trim().isNumeric(),
  ],
  artist : [
    check('name', 'Name cannot be empty.').trim().isLength({ min: 1 }),
  ],
  rate : [
    check('rater', 'Invalid Data').toInt().isNumeric().isLength({ min: 1 }),
    check('rated', 'Invalid Data').toInt().isNumeric().isLength({ min: 1 }),
    check('rated', 'You are not allowed rate this user').toInt().isNumeric().isLength({ min: 1 })
      .custom((ratedValue, { req }) => ratedValue !== req.body.rater),
    check('rating', 'Invalid Data').trim().isNumeric().isLength({ min: 1 }).isInt({ gt: -1 }),
  ],
  updateUser: user
}

export default validate

