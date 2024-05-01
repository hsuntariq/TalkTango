const express = require('express');
const { addChat, addMessages, findChat, addImageMessage, addVoiceMessage, chatLock, findMyChats, checkPass } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat', addChat)
router.post('/create-message', addMessages)
router.post('/create-image-message', addImageMessage)
router.post('/create-voice-message', addVoiceMessage)
router.get('/find-messages', findChat)
router.post('/chat-lock', chatLock)
router.get('/find-chats/:id', findMyChats)
router.post('/check-pass', checkPass)

module.exports = router;