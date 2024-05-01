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
        console.log('already exists')
    } else {
        const newChat = await Chat.create({
            users: [sender_id, receiver_id], chat: [],sender_id,receiver_id
        })
        res.send(newChat);
    }
})

const addMessages = AsyncHandler(async (req, res) => {
    const { message, sender_id, receiver_id } = req.body;
    const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    })
    try {
        if (findChat) {
            findChat.chat.push({
        _id: uuidv4(),
        message,
        sender_id,
        receiver_id,
        time:Date.now()
        })
        }
        await findChat.save();
        res.send(findChat)
    } catch (error) {
        throw new Error(error)
    }
    
    
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
const ChatModel = require('../models/ChatModel');

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
    }).sort({ time: -1 });
    if (findChat) {

        res.send(findChat)
    } else {
        throw new Error('No Data found')
    }
})



const chatLock = AsyncHandler(async (req, res) => {
    const { user_id, chat_id, pass,lock } = req.body;
    const findChat = await ChatModel.findOne({ _id: chat_id });
    if (!findChat) {
        res.status(404);
        throw new Error('Chat not found');
    } else {
        // If `chatLock` exists, find and update the existing lock information
            const existingLockIndex = findChat.chatLock.findIndex(lockItem => lockItem.user_id === user_id);
            if (existingLockIndex !== -1) {
                // If the user_id already exists in the `chatLock` array, update the lock information
                findChat.chatLock[existingLockIndex] = {
                    lock, pass, user_id
                };
            } else {
                // If the user_id doesn't exist in the `chatLock` array, add the new lock information
                findChat.chatLock.push({
                    lock, pass, user_id
                });
        }
        await findChat.save()
        
    }

    res.send(findChat)
})


const findMyChats = AsyncHandler(async (req, res) => {
    const user_id = req.params.id;
    const findChats = await ChatModel.find({sender_id:user_id});
    res.send(findChats);
});



const checkPass = AsyncHandler(async (req, res) => {
    const {sender_id,receiver_id,password} = req.body;
   const findChat = await Chat.findOne({
        users: { $all: [sender_id, receiver_id] }
    })
    if (!findChat) {
        res.status(404)
        throw new Error('chat not found')
    } else {
        if(findChat.chatLock[0].pass == password){
            res.send(findChat)
        } else {
            res.status(401);
            throw new Error('Invalid Password')
        }
    }
})



module.exports = {
    addChat,
    addMessages,
    findChat,
    addImageMessage,
    addVoiceMessage,
    chatLock,
    findMyChats,
    checkPass
}