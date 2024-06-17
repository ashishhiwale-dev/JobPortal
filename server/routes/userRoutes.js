const express = require('express');
const { registerController, passwordController, loginController } = require('../controllers/userController');

// Router Object
const router = express.Router()

// routes
// Register
router.post('/register', registerController);
router.post('/password', passwordController);
//Login
router.post('/login', loginController);

// export
module.exports = router;