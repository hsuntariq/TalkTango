const express = require('express');
const { addChat, addMessages } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat', addChat)
router.post('/create-message', addMessages)

module.exports = router;