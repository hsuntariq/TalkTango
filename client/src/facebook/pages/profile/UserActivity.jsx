import { Card, CardHeader, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyPosts } from "../../../features/posts/postSlice";
import Skeleton from "react-loading-skeleton";
import { getAllUsers } from "../../../features/auth/authSlice";
import { getFriends } from "../../../features/friends/friendSlice";
import { Typography } from "@mui/material";
import moment from "moment";

const UserActivity = () => {
  const dispatch = useDispatch();

  const { user, allUsers } = useSelector((state) => state.auth);
  const { myPosts, postLoading } = useSelector((state) => state.post);
  const { friends } = useSelector((state) => state.friend);
  const { posts } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getMyPosts(id));
    dispatch(getFriends(user?._id));
  }, [dispatch, id]);

  const findFriends = allUsers?.filter((item, index) => {
    return item?.id == friends[index];
  });

  let test = true;

  const findUser = allUsers.find((item) => item?._id == id);

  return (
    <>
      <div className="flex flex-col md:flex-row my-4 p-3 justify-between gap-10">
        <div className="flex flex-col gap-4 self-start">
          <Card className="p-4">
            <h4 className="font-bold uppercase">
              Friends .{" "}
              <span className="text-gray-400">
                {findFriends?.length} friends
              </span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {friends?.length > 0 ? (
                <>
                  {findFriends?.map((item, index) => {
                    console.log(item);
                    return (
                      <>
                        <Link to={`/profile/${item?._id}`}>
                          <Card className="p-2 mx-2 my-1">
                            <img
                              key={index}
                              className="w-[150px] h-[150px] m-3 object-cover "
                              src={
                                user?.image
                                  ? user?.image
                                  : "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                              }
                              alt=""
                            />

                            <Typography variant="h6" className="capitalize">
                              {item?.username}
                            </Typography>
                          </Card>
                        </Link>
                      </>
                    );
                  })}
                </>
              ) : (
                <h4 className="font-bold">No Friends</h4>
              )}
            </div>
          </Card>
        </div>

        {/* user activity */}
        <div className="flex flex-col w-full md:w-1/2 self-start p-3">
          <Card className="my-3">
            <div className="flex gap-4 bg-gray-100 p-4">
              <h3 className="font-bold uppercase">post</h3>
            </div>
            <input
              type="text"
              className="w-full outline-0 p-4"
              placeholder="Write something..."
            />
          </Card>
          <div className="h-[700px] overflow-y-scroll">
            {postLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <Card key={index} className="p-3 my-2">
                      <div className="flex items-center gap-3 my-1">
                        <Skeleton width={70} height={70} circle />
                        <div className="flex flex-col ">
                          <Skeleton width={100} height={15} />
                          <Skeleton width={150} height={15} />
                        </div>
                      </div>
                      <Skeleton width={"100%"} height={400} />
                    </Card>
                  );
                })}
              </>
            ) : (
              <>
                {myPosts?.map((post, index) => {
                  return (
                    <>
                      <Card className="my-2">
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-[50px] h-[50px] m-3 object-cover "
                            src={
                              user?.image
                                ? user?.image
                                : "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577"
                            }
                            alt=""
                          />
                          <div className="flex flex-col">
                            <h5 className="font-bold capitalize">Ali</h5>
                            <h5 className="font-bold text-sm text-gray-500 capitalize">
                              {moment(post?.createdAt?.toString()).fromNow()}
                            </h5>
                          </div>
                        </div>
                        <p className="text-gray-400 p-3 m-0">{post?.caption}</p>
                        {post?.image && (
                          <img
                            width="100%"
                            className="h-[500px] object-cover"
                            src={post?.image}
                            alt=""
                          />
                        )}
                        <div className="flex gap-4 m-0 text-center bg-gray-100 p-2">
                          <Link>
                            <div className="flex flex-col">
                              <BsFillHeartFill className="text-xl font-bold" />
                              <h6 className="font-bold">
                                {post?.likes?.length}
                              </h6>
                            </div>
                          </Link>{" "}
                          <Link to={`/single-post/${post?._id}/${post?.user}`}>
                            <div className="flex flex-col">
                              <FaRegCommentDots className="text-xl font-bold" />
                              <h6 className="font-bold">
                                {post?.comments?.length}
                              </h6>
                            </div>
                          </Link>
                          <div
                            onClick={() =>
                              sharePost(user?._id, post.caption, post?.image)
                            }
                            className="py-2 px-2 text-xl"
                          >
                            <RiShareForwardLine />
                          </div>
                        </div>
                        <div className="flex ">
                          <img
                            className="w-[50px] rounded-full h-[50px] m-3 object-cover "
                            src={
                              user?.image
                                ? user?.image
                                : "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577"
                            }
                            alt=""
                          />
                          <input
                            type="text"
                            className="w-full outline-0 p-2 "
                            placeholder="Write something..."
                          />
                        </div>
                      </Card>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserActivity;
