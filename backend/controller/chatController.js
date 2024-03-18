const AsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid')
const Chat = require('../models/ChatModel');
const streamToBlob = require('stream-to-blob');

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

    // Find the chat conversation
    let findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    });

    // If chat exists
    if (findChat) {
        findChat.chat.push({ _id: uuidv4(), image, message })
        findChat = await findChat.save();
        res.send(findChat);
    } else {
        res.status(404).send("Chat not found");
    }
});


const { Buffer } = require('buffer');

const addVoiceMessage = AsyncHandler(async (req, res) => {
    const { voice, sender_id, receiver_id } = req.body;

    // Convert the Blob object to a buffer
    const voiceBuffer = Buffer.from(await voice.arrayBuffer());

    // Find the chat conversation
    let findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    });

    // If chat exists
    if (findChat) {
        // Push the voice buffer into the "chat" array
        findChat.chat.push({ _id: uuidv4(), voice: voiceBuffer });

        // Save the updated chat conversation
        findChat = await findChat.save();

        // Return th    e updated chat conversation in the response
        res.send(findChat);
    } else {
        res.status(404).send("Chat not found");
    }
});





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
    addImageMessage,
    addVoiceMessage
}