const express = require('express');
const { signupController } = require('../controllers');
const router = express.Router();

router.post('/', signupController.createUser)
router.get('/', signupController.getUsers)

module.exports = router;