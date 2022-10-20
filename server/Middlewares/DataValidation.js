const {body} = require('express-validator')

exports.DataValidation=[
    body('email','Invalid email').isEmail(),
body('password','The password should be at least 6 caracters').isLength({min:6})
]