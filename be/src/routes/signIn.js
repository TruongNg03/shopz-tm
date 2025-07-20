const express = require('express');
const router = express.Router();

const signInController = require('../app/controllers/SignInController');

router.post('/register', signInController.register);
router.post('/login', signInController.login);

module.exports = router;
