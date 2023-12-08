const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);  

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;