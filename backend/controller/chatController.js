const AsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid')
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
    findChat.chat.push({
        _id: uuidv4(),
        message
    })
    await findChat.save();
    res.send(findChat)
})


const addImageMessage = AsyncHandler(async (req, res) => {
    const { image, message, sender_id, receiver_id } = req.body;
    const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    });
    findChat.chat.imageMessage ? findChat.chat.imageMessage.push({ image, message }) : findChat.chat.push({
        imageMessage: [{ image, message }]
    })

    await findChat.save();
    res.send(findChat)
})


const findChat = AsyncHandler(async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    });
    if (findChat) {

        res.send(findChat.chat)
    } else {
        throw new Error('No Data found')
    }
})

module.exports = {
    addChat,
    addMessages,
    findChat,
    addImageMessage
}