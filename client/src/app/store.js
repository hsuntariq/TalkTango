import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import postReducer from "../features/posts/postSlice";
import friendReducer from "../features/friends/friendSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import videoReducer from "../features/video/videoSlice";
import storyReducer from "../features/stories/storySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    post: postReducer,
    friend: friendReducer,
    notification: notificationReducer,
    video: videoReducer,
    story: storyReducer,
  },
});

export default store;
