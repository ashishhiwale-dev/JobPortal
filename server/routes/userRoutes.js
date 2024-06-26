const express = require('express');
const { registerController, passwordController, loginController } = require('../controllers/userController');
const router = express.Router();

// Register
router.post('/register', registerController);
router.post('/password', passwordController);
//Login
router.post('/login', loginController);

module.exports = router;
