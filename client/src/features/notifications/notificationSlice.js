import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notificationService } from "./notificationService";

const initialState = {
    requests: [],
    requestLoading: false,
    requestSuccess : false,
    requestError: false,
    requestMessage : ''
};

export const getRequestData = createAsyncThunk('notification/get-requests', async (data,thunkAPI) => {
    try {
        return await notificationService.getRequests(data)
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



export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        reset: (state) => {
            state.requestLoading = false;
            state.requestError = false;
            state.requestSuccess = false;
            state.requestMessage = '';
            // state.allUsers = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequestData.pending, (state) => {
            state.requestLoading = true
            })
        .addCase(getRequestData.rejected,(state,action)=>{
            state.requestLoading = false;
            state.requestError = true;
            state.requestMessage = action.payload
        })
        .addCase(getRequestData.fulfilled,(state,action)=>{
            state.requestLoading = false;
            state.requestSuccess = true;
            state.requests = action.payload
        })
     }

})


export const {reset} = notificationSlice.actions
export default notificationSlice.reducer