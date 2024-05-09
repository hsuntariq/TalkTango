const AsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const Chat = require("../models/ChatModel");
const ScheduleMessage = require("../models/scheduleModel");

const addChat = AsyncHandler(async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
  });
  if (findChat) {
    res.send(findChat);
    console.log("already exists");
  } else {
    const newChat = await Chat.create({
      users: [sender_id, receiver_id],
      chat: [],
      sender_id,
      receiver_id,
    });
    res.send(newChat);
  }
});

const addMessages = AsyncHandler(async (req, res) => {
  const { message, sender_id, receiver_id } = req.body;
  const findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
  });
  try {
    if (findChat) {
      findChat.chat.push({
        _id: uuidv4(),
        message,
        sender_id,
        receiver_id,
        time: Date.now(),
      });
    }
    await findChat.save();
    res.send(findChat);
  } catch (error) {
    throw new Error(error);
  }
});

const addImageMessage = AsyncHandler(async (req, res) => {
  const { image, message, sender_id, receiver_id } = req.body;

  // Find the chat conversation
  let findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
  });

  // If chat exists
  if (findChat) {
    findChat.chat.push({ _id: uuidv4(), image, message });
    findChat = await findChat.save();
    res.send(findChat);
  } else {
    res.status(404).send("Chat not found");
  }
});

const { Buffer } = require("buffer");
const ChatModel = require("../models/ChatModel");

const addVoiceMessage = AsyncHandler(async (req, res) => {
  const { voice, sender_id, receiver_id } = req.body;

  // Convert the Blob object to a buffer
  const voiceBuffer = Buffer.from(await voice.arrayBuffer());

  // Find the chat conversation
  let findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
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
    users: { $all: [sender_id, receiver_id] },
  }).sort({ time: -1 });
  if (findChat) {
    res.send(findChat);
  } else {
    throw new Error("No Data found");
  }
});

const chatLock = AsyncHandler(async (req, res) => {
  const { user_id, chat_id, pass, lock } = req.body;
  const findChat = await ChatModel.findOne({ _id: chat_id });
  if (!findChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    // If `chatLock` exists, find and update the existing lock information
    const existingLockIndex = findChat.chatLock.findIndex(
      (lockItem) => lockItem.user_id === user_id
    );
    if (existingLockIndex !== -1) {
      // If the user_id already exists in the `chatLock` array, update the lock information
      findChat.chatLock[existingLockIndex] = {
        lock,
        pass,
        user_id,
      };
    } else {
      // If the user_id doesn't exist in the `chatLock` array, add the new lock information
      findChat.chatLock.push({
        lock,
        pass,
        user_id,
      });
    }
    await findChat.save();
  }

  res.send(findChat);
});

const findMyChats = AsyncHandler(async (req, res) => {
  const user_id = req.params.id;
  const findChats = await ChatModel.find({ sender_id: user_id });
  res.send(findChats);
});

const checkPass = AsyncHandler(async (req, res) => {
  const { sender_id, receiver_id, password } = req.body;
  const findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
  });
  if (!findChat) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    if (findChat.chatLock[0].pass == password) {
      res.send(findChat);
    } else {
      res.status(401);
      throw new Error("Invalid Password");
    }
  }
});

const scheduleMessage = AsyncHandler(async (req, res) => {
  try {
    const { message, date, sender_id, receiver_id } = req.body;

    const newScheduledMessage = await ScheduleMessage.create({
      users: [sender_id, receiver_id],
      message: message,
      date: date,
      sender_id,
      receiver_id,
    });

    res.send(newScheduledMessage);
  } catch (error) {
    console.error("Error scheduling message:", error);
    throw new Error(error.message);
  }
});

const schedule = require("node-schedule");

const sendMessages = AsyncHandler(async (msg) => {
  const { message, sender_id, receiver_id } = msg;
  // console.log(message,sender_id,receiver_id)
  const findChat = await Chat.findOne({
    users: { $all: [sender_id, receiver_id] },
  });

  try {
    if (findChat) {
      console.log("found");
      findChat.chat.push({
        _id: uuidv4(),
        message,
        sender_id,
        receiver_id,
        time: Date.now(),
      });
      await findChat.save();
    } else {
      console.log("not found");
      await Chat.create({
        users: [sender_id, receiver_id],
        chat: [{ _id: uuidv4(), message }],
        sender_id,
        receiver_id,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const sendScheduleMessage = AsyncHandler(async (req, res) => {
  try {
    // Find messages scheduled for the current time or earlier
    const currentTime = new Date();
    const messages = await ScheduleMessage.find({
      date: { $lte: currentTime },
    });

    // Iterate through messages and send them
    if (messages) {
      for (const message of messages) {
        // Send message logic goes here
        // console.log('Sending message:', message);
        await sendMessages(message);

        // Optionally, you can delete the message from the database after sending it
        await ScheduleMessage.findByIdAndDelete(message._id);
      }
      console.log("sent");
    }
  } catch (error) {
    console.error("Error scheduling messages:", error);
  }
});

// Schedule the function to run every minute (adjust as needed)
schedule.scheduleJob("* * * * *", sendScheduleMessage);

module.exports = {
  addChat,
  addMessages,
  findChat,
  addImageMessage,
  addVoiceMessage,
  chatLock,
  findMyChats,
  checkPass,
  scheduleMessage,
};
