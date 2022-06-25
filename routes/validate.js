const express = require('express');
const router = express.Router();

const {validationController} = require('../controllers');

router.post('/emailValidation', validationController.emailValidate);


module.exports = router;