const express = require('express');
const { addChat, addMessages, findChat } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat', addChat)
router.post('/create-message', addMessages)
router.get('/find-messages', findChat)

module.exports = router;