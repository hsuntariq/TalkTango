import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addFriendData, reset } from "../../../features/friends/friendSlice";
import { CircleLoader } from "react-spinners";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import SingleSuggestion from "./SingleSuggestion";

const MainSuggestions = () => {
  const { allUsers, user } = useSelector((state) => state.auth);
  const { friendLoading, friendSuccess, friendError, friendMessage } =
    useSelector((state) => state.friend);
  const dispatch = useDispatch();

  const add = (friend_id) => {
    const data = {
      user_id: user?._id,
      friend_id,
    };
    dispatch(addFriendData(data)).then(() =>
      toast.success("Request sent successfully!")
    );
  };

  useEffect(() => {
    if (friendError) {
      toast.error(friendMessage);
    }
    dispatch(reset());
  }, [friendError, friendSuccess, dispatch, friendMessage]);

  return (
    <>
      <div className="flex overflow-y-hidden flex-col h-[90vh] overflow-y-scroll gap-2 ">
        {allUsers?.map((person, index) => {
          return (
            <>
              <SingleSuggestion
                {...person}
                friendLoading={friendLoading}
                add={add}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default MainSuggestions;
