const express = require('express');
const { addChat, addMessages, findChat, addImageMessage } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat', addChat)
router.post('/create-message', addMessages)
router.post('/create-image-message', addImageMessage)
router.get('/find-messages', findChat)

module.exports = router;