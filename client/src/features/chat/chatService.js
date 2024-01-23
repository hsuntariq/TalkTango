import axios from 'axios';
const base_url = 'http://localhost:5174/api/chats';


const addChat = async (data) => {
    const response = await axios.post(`${base_url}/create-chat`, data);
    return response.data
}

const addMessage = async (messageData) => {
    const response = await axios.post(`${base_url}/create-message`, messageData)
    return response.data;
}

export const chatService = {
    addChat,
    addMessage
}