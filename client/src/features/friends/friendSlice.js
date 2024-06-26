import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendService } from "./friendService";

const initialState = {
    friends: [],
    friendLoading: false,
    friendSuccess: false,
    friendError: false,
    friendMessage: ''
};

export const addFriendData = createAsyncThunk('friend/add-friend', async (data, thunkAPI) => {
    try {
        return await friendService.addFriend(data)
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
export const cancelFriend = createAsyncThunk('friend/cancel-request', async (data, thunkAPI) => {
    try {
        return await friendService.cancelRequest(data)
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
export const accceptFriend = createAsyncThunk('friend/accept-request', async (data, thunkAPI) => {
    try {
        return await friendService.acceptRequest(data)
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
export const getFriends = createAsyncThunk('friend/get-friends', async (data, thunkAPI) => {
    try {
        console.log(data)
        return await friendService.getFriends(data)
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



export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        reset: (state) => {
            state.friendLoading = false;
            state.friendError = false;
            state.friendSuccess = false;
            state.friendMessage = '';
            // state.allUsers = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFriendData.pending, (state) => {
                state.friendLoading = true
            })
            .addCase(addFriendData.rejected, (state, action) => {
                state.friendLoading = false;
                state.friendError = true;
                state.friendMessage = action.payload
            })
            .addCase(addFriendData.fulfilled, (state, action) => {
                state.friendLoading = false;
                state.friendSuccess = true;
                state.friends = action.payload
            })
            .addCase(cancelFriend.pending, (state) => {
                state.friendLoading = true
            })
            .addCase(cancelFriend.rejected, (state, action) => {
                state.friendLoading = false;
                state.friendError = true;
                state.friendMessage = action.payload
            })
            .addCase(cancelFriend.fulfilled, (state, action) => {
                state.friendLoading = false;
                state.friendSuccess = true;
                console.log(action.payload)
                state.friends = action.payload
            })
            .addCase(accceptFriend.pending, (state) => {
                state.friendLoading = true
            })
            .addCase(accceptFriend.rejected, (state, action) => {
                state.friendLoading = false;
                state.friendError = true;
                state.friendMessage = action.payload
            })
            .addCase(accceptFriend.fulfilled, (state, action) => {
                state.friendLoading = false;
                state.friendSuccess = true;
                state.friends = action.payload
            })
            .addCase(getFriends.pending, (state) => {
                state.friendLoading = true
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.friendLoading = false;
                state.friendError = true;
                state.friendMessage = action.payload
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friendLoading = false;
                state.friendSuccess = true;
                state.friends = action.payload
            })

    }

})


export const { reset } = friendSlice.actions
export default friendSlice.reducer