import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    themeLoading:false,
    themeError: false,
    themeSuccess:false,
    allUsers: []
};

// handle the user registration

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.registerUser(userData)
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

// handle the user login

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.loginUser(userData)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.error) ||
            error.message ||  
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        return await authService.logoutUser()
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.error) ||
            error.message ||  
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllUsers = createAsyncThunk('auth/get-all-users', async (_, thunkAPI) => {
    try {
        return await authService.getAllUsers()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


// verify otp

export const verifyOTP = createAsyncThunk('auth/verify', async (data, thunkAPI) => {
    try {
        return await authService.verifyOTP(data);
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
export const setTheme = createAsyncThunk('auth/set-theme', async (data, thunkAPI) => {
    try {
        return await authService.setTheme(data);
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
export const setChatTheme = createAsyncThunk('auth/set-chat-theme', async (data, thunkAPI) => {
    try {
        console.log(data)
        return await authService.setChatTheme(data);
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.themeSuccess = false;
            state.themeError = false;
            state.message = '';
            state.allUsers = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'Invalid Credentials'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload 
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.allUsers = null
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                // state.user = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload
                state.message = 'Success'

            })
            .addCase(setTheme.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(setTheme.rejected, (state, action) => {
                state.themeError = true;
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(setTheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.themeSuccess = true;
                // console.log(action)
                state.user = action.payload;
                localStorage.removeItem('user');
                localStorage.setItem('user',JSON.stringify(action.payload))
            })
            .addCase(setChatTheme.pending,(state)=>{
                state.themeLoading = true
            })
            .addCase(setChatTheme.rejected, (state, action) => {
                state.themeError = true;
                state.message = action.payload;
                state.themeLoading = false;
            })
            .addCase(setChatTheme.fulfilled, (state, action) => {
                state.themeLoading = false;
                state.themeSuccess = true;
                // console.log(action)
                state.user = action.payload;
                localStorage.removeItem('user');
                localStorage.setItem('user',JSON.stringify(action.payload))
            })
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;
