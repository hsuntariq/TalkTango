const AsyncHandler = require('express-async-handler');
const Chat = require('../models/ChatModel');
const addChat = AsyncHandler(async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    })
    if (findChat) {
        res.send(findChat);
    } else {
        const newChat = await Chat.create({
            users: [sender_id, receiver_id], chat: []
        })
        res.send(newChat);
    }
})

const addMessages = AsyncHandler(async (req, res) => {
    const { message, sender_id, receiver_id } = req.body;
    const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    })
    findChat.chat.push(message)
    await findChat.save();
    res.send(findChat)
})

module.exports = {
    addChat,
    addMessages
}