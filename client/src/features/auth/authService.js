import axios from 'axios';
const base_url = 'http://localhost:5174/api/users';

const registerUser = async (userData) => {
    const response = await axios.post(`${base_url}/post-user`, userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    } else {
        console.log('error');
    }
    return response.data
}
const loginUser = async (userData) => {
    const response = await axios.post(`${base_url}/login-user`, userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    } else {
        console.log('error');
    }
    return response.data
}

const logoutUser = () => {
    localStorage.removeItem('user');
}

const getAllUsers = async () => {
    const response = await axios.get(`${base_url}/get-all-users`);
    return response.data;
    
}


const verifyOTP = async (data) => {
    try {

    const response = await axios.post(`${base_url}/verify-otp/${data.id}`, {otp:data.otp});
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; 
  }
};


const setTheme = async (themeData) => {
    try {
        const response = await axios.put(`${base_url}/set-theme`,{id:themeData.id,bgTheme:themeData.theme})
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const setChatTheme = async (themeData) => {
    try {
        const response = await axios.put(`${base_url}/set-chat-theme`,{id:themeData.id,chatBG:themeData.chatBG,chatImage:themeData.chatImage})
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const sendResetLink = async (data) => {
    try {
        const response = await axios.post(`${base_url}/send-reset-link`,data)
        return response.data;
    } catch (error) {
        console.log(error)
    }

}



export const authService = {
    registerUser,
    getAllUsers,
    loginUser,
    logoutUser,
    verifyOTP,
    setTheme,
    setChatTheme,
    sendResetLink

}