import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    }
})

export default store;