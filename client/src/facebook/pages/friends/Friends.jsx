import React, { useDebugValue, useEffect } from "react";
import Header from "../home/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import MainSuggestions from "../../components/suggestions/MainSuggestions";
import FriendList from "./FriendList";
import { getFriends } from "../../../features/friends/friendSlice";
import { useDispatch, useSelector } from "react-redux";

const Friends = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends(user?._id));
  }, [dispatch]);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col min-w-[100vw] overflow-x-scroll gap-5 md:flex-row">
          <div className="w-full md:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full md:w-[55%] ">
            <FriendList />
          </div>
          <div className="mt-[4rem] overflow-y-scroll w-1/5 h-[90%] bg-white p-3 md:fixed right-0 top-0 ">
            <MainSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
