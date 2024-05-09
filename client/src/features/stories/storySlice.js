import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storyService } from "./storyService";

const initialState = {
  stories: [],
  storyLoading: false,
  storySuccess: false,
  storyError: false,
  storyMessage: "",
  storyImages: [],
  singleStory: [],
  shared: false,
  myStories: [],
};

export const uploadStoryData = createAsyncThunk(
  "story/add-story",
  async (data, thunkAPI) => {
    try {
      return await storyService.uploadStory(data);
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    reset: (state) => {
      state.storyError = false;
      state.storySuccess = false;
      state.storyLoading = false;
      state.storyMessage = "";
      (state.shared = false), (state.commentLoading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadStoryData.pending, (state) => {
        state.storyLoading = true;
      })
      .addCase(uploadStoryData.rejected, (state, action) => {
        state.storyLoading = false;
        state.storyError = true;
        state.message = action.payload;
      })
      .addCase(uploadStoryData.fulfilled, (state, action) => {
        state.storyLoading = false;
        state.storySuccess = true;
        state.stories.push(action.payload);
      });
  },
});

export const { reset } = storySlice.actions;
export default storySlice.reducer;
