import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from './postService';

const initialState = {
    posts: [],
    comments: [],
    postLoading: false,
    postSuccess: false,
    postError: false,
    postMessage: '',
    postImages: [],
    singlePost: [],
    shared: false,
    commentLoading: false,
    myPosts: []
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
export const getCommentsData = createAsyncThunk('posts/get-comments', async (data, thunkAPI) => {
    try {
        return await postService.getComments(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})
export const makeComment = createAsyncThunk('posts/post-comments', async (data, thunkAPI) => {
    try {
        return await postService.makeComment(data)
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
export const updateComment = createAsyncThunk('posts/update-comment', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await postService.updateComment(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})
export const deleteComment = createAsyncThunk('posts/delete-comment', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await postService.deleteComment(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})
export const getMyPosts = createAsyncThunk('posts/get-my-posts', async (data, thunkAPI) => {
    try {
        // console.log(data)
        return await postService.getMyPosts(data)
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
            state.shared = false,
                state.commentLoading = false
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
            .addCase(getCommentsData.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(getCommentsData.rejected, (state, action) => {
                state.commentLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(getCommentsData.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.postSuccess = true
                state.comments = action.payload
            })
            .addCase(makeComment.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(makeComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(makeComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.postSuccess = true
                state.comments?.push(action.payload)
            })
            .addCase(updateComment.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.postSuccess = true
                state.comments = state.comments.map((item) => {
                    if (item.id == action.payload.id) {
                        item.comment = action.payload.comment
                    }
                    return item
                })
            })
            .addCase(deleteComment.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.postSuccess = true
                state.comments = action.payload?.comments
            })
            .addCase(getMyPosts.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(getMyPosts.rejected, (state, action) => {
                state.commentLoading = false;
                state.postError = true;
                state.postMessage = action.payload;
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.postSuccess = true
                state.myPosts = action.payload
            })

    }

})


export const { reset } = postSlice.actions;
export default postSlice.reducer;