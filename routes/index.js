const express = require('express');
const router = express.Router();

const bookRoute = require('./book');
const signupRoute = require('./signup');

const loginRoute = require('./login');
const validation = require('./validate');



router.use('/signup',signupRoute);
router.use('/login', loginRoute);
router.use('/', validation);
router.use('/book',bookRoute);



module.exports = router;