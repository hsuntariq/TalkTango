import UserCard from "./UserCard";
import StoryCard from "./StoryCard";
import "./story.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getStoryData, reset } from "../../../../features/stories/storySlice";
import Skeleton from "react-loading-skeleton";
import { getAllUsers } from "../../../../features/auth/authSlice";
import { Link } from "react-router-dom";
const Story = () => {
  const dispatch = useDispatch();
  const { storyLoading, stories, storyError, storyMessage, storySuccess } =
    useSelector((state) => state.story);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (storyError) {
      toast.error(storyMessage);
    }
    dispatch(getStoryData());
    dispatch(reset());
  }, [dispatch, storyError, storyMessage]);
  return (
    <>
      <div className="container w-[90%] md:w-3/4 mx-auto mt-4 relative top-20">
        <div className="flex justify-between items-center">
          <h2 className="text-1xl text-gray-800 font-bold my-2">Stories</h2>
          <Link to={`/all-stories/${user?._id}`} className="text-blue-500">
            See All
          </Link>
        </div>
        <div
          className="flex story-bar"
          style={{
            flexWrap: "nowrap",
            overflowX: "scroll",
          }}
        >
          <UserCard />
          {/* {Array.from({ length: 8 }).map((index) => {
                        return <StoryCard key={index} />
                    })} */}

          {storyLoading ? (
            <>
              {Array.from({ length: 5 }).map((index) => {
                return (
                  <>
                    <div className="flex">
                      <Skeleton width={100} height={120} />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {stories?.map((story, index) => {
                return (
                  <StoryCard myUser={story?.user} {...story} key={index} />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Story;
