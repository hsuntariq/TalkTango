const express = require('express');
const { registerUser, getAllUsers, loginUser, verifyOTP, setTheme, setChatTheme } = require('../controller/userController');
const authMiddleware = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.post('/post-user',registerUser)
router.post('/login-user',loginUser)
router.get('/get-all-users',getAllUsers)
router.post('/verify-otp/:id',verifyOTP)
router.put('/set-theme',setTheme)
router.put('/set-chat-theme',setChatTheme)

module.exports = router