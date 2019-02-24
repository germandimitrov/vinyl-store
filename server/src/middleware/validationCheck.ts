import { check } from "express-validator/check";

const validate = {
  register : [
    check('firstName', 'First Name cannot be empty').trim().isLength({min: 1}),
    check('lastName', 'Last Name cannot be empty').trim().isLength({min: 1}),
    check('password', 'Password must be a least 3 characters').isLength({ min: 3 }),
    check('email' , 'Invalid Email').isEmail(),
    check('confirmPassword', 'Passwords should match')
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ],
  login : [
    check('password', 'Password cannot be empty').isLength({ min: 1 }),
    check('email', 'Invalid Email').isEmail(),
  ],
  record : [
    check('name', 'Name cannot be empty.').trim().isLength({ min: 1 }),
    check('description', 'Description cannot be empty.').trim().isLength({ min: 1 }),
    check('price', 'Price should be a number.').trim().isNumeric(),
  ],
  artist : [
    check('name', 'Name cannot be empty.').trim().isLength({ min: 1 }),
  ],
}

export default validate

