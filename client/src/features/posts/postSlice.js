import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from './postService';

const initialState = {
    posts: [],
    postLoading: false,
    postSuccess: false,
    postError: false,
    postMessage: '',
    postImages: [],
    singlePost: [],
    shared: false
}


export const postData = createAsyncThunk('posts/add-caption', async (post, thunkAPI) => {
    try {
        return await postService.postCaption(post)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})


export const postImage = createAsyncThunk('posts/post-image', async (imageData, thunkAPI) => {
    try {
        // console.log(imageData)
        return await postService.postImage(imageData)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})


export const getPostData = createAsyncThunk('posts/get-post', async (_, thunkAPI) => {
    try {
        return await postService.getPosts()
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})


export const getPostLikes = createAsyncThunk('posts/like-post', async (data, thunkAPI) => {
    try {
        return await postService.likePost(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const getSinglePostData = createAsyncThunk('posts-get-single', async (data, thunkAPI) => {
    try {
        return await postService.singlePost(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})
export const sharedPost = createAsyncThunk('posts-share-post', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await postService.sharePost(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})



export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => {
            state.postError = false;
            state.postSuccess = false;
            state.postLoading = false;
            state.postMessage = '';
            state.shared = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postData.pending, (state) => {
                state.postLoading = true
            })
            .addCase(postData.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.postLoading = false;
                state.postSuccess = true;
                state.posts.push(action.payload)
            })
            .addCase(postImage.pending, (state) => {
                state.postLoading = true
            })
            .addCase(postImage.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload
            })
            .addCase(postImage.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.postLoading = false;
                state.postSuccess = true;
                state.postImages.push(action.payload)
            })
            .addCase(getPostData.pending, (state) => {
                state.postLoading = true
            })
            .addCase(getPostData.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(getPostData.fulfilled, (state, action) => {
                state.postLoading = false;
                state.postSuccess = true;
                state.posts = action.payload
            })
            .addCase(getPostLikes.pending, (state) => {
                state.postLoading = true
            })
            .addCase(getPostLikes.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(getPostLikes.fulfilled, (state, action) => {
                state.postLoading = false;
                state.postSuccess = true;
                state.posts = state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        post.likes = action.payload.likes
                    }
                    return post
                })
            })
            .addCase(getSinglePostData.pending, (state) => {
                state.postLoading = true
            })
            .addCase(getSinglePostData.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(getSinglePostData.fulfilled, (state, action) => {
                state.postLoading = false;
                state.postSuccess = true;
                // state.singlePost = action.payload
            })
            .addCase(sharedPost.pending, (state) => {
                state.postLoading = true
            })
            .addCase(sharedPost.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(sharedPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.shared = true;
                state.posts.push(action.payload)
            })
    }

})


export const { reset } = postSlice.actions;
export default postSlice.reducer;