import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { videoService } from './videoService';

const initialState = {
    videos: [],
    videoLoading: false,
    videoSuccess: false,
    videoError: false,
    videoMessage: '',
    videoImages: [],
    singleVideo: [],
    myVideos: []
}


export const uploadVideoData = createAsyncThunk('video/uploadVideo', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await videoService.uploadVideo(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})
export const getVideoData = createAsyncThunk('video/get-video', async (_, thunkAPI) => {
    try {
        // console.log(data)
        return await videoService.getVideos()
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})


export const getVideoLikes = createAsyncThunk('posts/like-video', async (data, thunkAPI) => {
    try {
        return await videoService.likeVideo(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})




export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        reset: (state) => {
            state.videoError = false;
            state.videoSuccess = false;
            state.videoLoading = false;
            state.videoMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideoData.pending, (state) => {
                state.videoLoading = true
            })
            .addCase(uploadVideoData.rejected, (state, action) => {
                state.videoLoading = false;
                state.videoError = true
                state.videoMessage = action.payload
            })
            .addCase(uploadVideoData.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videoSuccess = true;
                state.videos.push(action.payload)
                
            })
            .addCase(getVideoData.pending, (state) => {
                state.videoLoading = true
            })
            .addCase(getVideoData.rejected, (state, action) => {
                state.videoLoading = false;
                state.videoError = true
                state.videoMessage = action.payload
            })
            .addCase(getVideoData.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videoSuccess = true;
                state.videos = action.payload;
                
            })
        .addCase(getVideoLikes.pending, (state) => {
                state.videoLoading = true
            })
            .addCase(getVideoLikes.rejected, (state, action) => {
                state.videoLoading = false;
                state.videoError = true;
                state.videoMessage = action.payload;
            })
            .addCase(getVideoLikes.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videoSuccess = true;
                state.videos = state.videos.map((video) => {
                    if (video._id === action.payload._id) {
                        video.likes = action.payload.likes
                    }
                    return video
                })
            })
    }
})


export const { reset } = videoSlice.actions;
export default videoSlice.reducer;