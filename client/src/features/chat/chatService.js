import axios from 'axios';
const base_url = 'http://localhost:5174/api/chats';


const addChat = async (data) => {
    const response = await axios.post(`${base_url}/create-chat`, data);
    console.log(response)
    return response.data
}

const addMessage = async (messageData) => {
    const response = await axios.post(`${base_url}/create-message`, messageData)
    return response.data;
}
const addImageMessage = async (messageData) => {
    const response = await axios.post(`${base_url}/create-image-message`, messageData)
    return response.data;
}
const addVoiceMessage = async (messageData) => {
    console.log(messageData)
    const response = await axios.post(`${base_url}/create-voice-message`, {
        sender_id: messageData.sender_id,
        receiver_id: messageData.receiver_id,
        voice: messageData.voice,
    })
    return response.data;
}


const findChat = async (chatData) => {
    const response = await axios.get(`${base_url}/find-messages`, chatData);
    return response.data
}
const chatLock = async (chatData) => {
    const response = await axios.post(`${base_url}/chat-lock`, chatData);
    return response.data
}
const findMyChats = async (user_id) => {
    const response = await axios.get(`${base_url}/find-chats/${user_id}`);
    return response.data
}
const checkPass = async (data) => {
    const response = await axios.post(`${base_url}/check-pass`,data);
    return response.data
}
const scheduleMessage = async (data) => {
    const response = await axios.post(`${base_url}/schedule-message`,data);
    return response.data
}

export const chatService = {
    addChat,
    addMessage,
    addImageMessage,
    addVoiceMessage,
    findChat,
    chatLock,
    findMyChats,
    checkPass,
    scheduleMessage
}