import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./chat/Home";
import MessagePanel from "./chat/messagebar/MessagePanel";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/error/Error";
import OTP from "./authentication/OTP";
import "react-loading-skeleton/dist/skeleton.css";
import EnterEmail from "./authentication/forgotten_password/EnterEmail";
import ResetPass from "./authentication/forgotten_password/ResetPass";
import Audio from "./Audio";
import Home2 from "./facebook/pages/home/Home";
import SinglePost from "./facebook/components/singlePost/SinglePost";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import VideoCallZego from "./videoCall/VideoCall";
import Friends from "./facebook/pages/friends/Friends";
import UserProfile from "./facebook/pages/profile/UserProfile";
import TikHome from "./tiktok/TikHome";
import SingleVideo from "./tiktok/components/SingleVideo";
import Test from "./Test";
import Filters from "./Filters";
import AllStories from "./facebook/components/timeline/stories/AllStories";
// import Test from "./Test"
const App = () => {
  const [videoLink, setVideoLink] = useState("");

  const handleVideoLink = (link) => {
    setVideoLink(link);
  };

  const [link, setLink] = useState("");
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/message-panel/:receiver_id"
              element={<MessagePanel link={videoLink} />}
            />
            <Route path="/verify/:id" element={<OTP />} />
            <Route path="/forgotten-password" element={<EnterEmail />} />
            <Route path="/reset-password/:id" element={<ResetPass />} />
            <Route path="/audio" element={<Audio />} />
            <Route
              path="/video/:caller_id/:receiver_id"
              element={<VideoCallZego />}
            />

            {/* facebook */}

            <Route path="/fb-home/:user_id" element={<Home2 />} />
            <Route path="/single-post/:id/:user_id" element={<SinglePost />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/all-stories/:id" element={<AllStories />} />

            {/* tiktok */}
            <Route path="tik-home/:id" element={<TikHome />} />
            <Route
              path="single-video/:user_id/:video_id"
              element={<SingleVideo />}
            />
            {/* <Route path="/filters" element={<Filters />} /> */}

            {/* {test} */}
            <Route path="/test" element={<Test />} />
            {/* not-found */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
