import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from './chatService';

const initialState = {
    chatData: [],
    chatLoading: false,
    chatError: false,
    chatSuccess: false,
    message: '',
    myChats:[]
}


export const createChat = createAsyncThunk('chat/add-chat', async (data, thunkAPI) => {
    try {
        return await chatService.addChat(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getChat = createAsyncThunk('chat/get-chat', async (data, thunkAPI) => {
    try {
        return await chatService.findChat(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const findMyChats = createAsyncThunk('chat/find-my-chats', async (data, thunkAPI) => {
    try {
        return await chatService.findMyChats(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const createMessage = createAsyncThunk('chat/add-message', async (data, thunkAPI) => {
    try {
        return await chatService.addMessage(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const createImageMessage = createAsyncThunk('chat/add-image-message', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await chatService.addImageMessage(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const createVoiceMessage = createAsyncThunk('chat/add-voice-message', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await chatService.addVoiceMessage(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const chatLock = createAsyncThunk('chat/chat-lock', async (data, thunkAPI) => {
    try {
        return await chatService.chatLock(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const checkPass = createAsyncThunk('chat/check-pass', async (data, thunkAPI) => {
    try {
        return await chatService.checkPass(data)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state) => {
            state.chatLoading = false;
            state.chatError = false;
            state.chatSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChat.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
            .addCase(createMessage.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
            .addCase(createImageMessage.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(createImageMessage.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(createImageMessage.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                // state.chatData = action.payload;
            })
            .addCase(createVoiceMessage.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(createVoiceMessage.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(createVoiceMessage.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
            .addCase(getChat.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(getChat.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(getChat.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
            .addCase(chatLock.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(chatLock.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(chatLock.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
            .addCase(findMyChats.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(findMyChats.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(findMyChats.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.myChats = action.payload;
            })
            .addCase(checkPass.pending, (state) => {
                state.chatLoading = true;
            })
            .addCase(checkPass.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.message = action.payload
            })
            .addCase(checkPass.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chatData = action.payload;
            })
    }
})


export const { reset } = chatSlice.actions;
export default chatSlice.reducer