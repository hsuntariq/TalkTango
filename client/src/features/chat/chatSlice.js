import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from './chatService';

const initialState = {
    chatData: [],
    chatLoading: false,
    chatError: false,
    chatSuccess: false,
    message: '',
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
                state.chatData = action.payload;
            })
    }
})


export const { reset } = chatSlice.actions;
export default chatSlice.reducer