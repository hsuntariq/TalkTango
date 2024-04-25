/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPostData, getPostLikes, reset, sharedPost } from '../../../../features/posts/postSlice';
import 'react-loading-skeleton/dist/skeleton.css'
import Loader from './Loader';
import { getAllUsers } from '../../../../features/auth/authSlice';
import { FaPlus, FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { Button, Card, CardHeader } from '@mui/material';

import moment from 'moment'
import AllPosts from './AllPosts';
import MorePosts from './MorePosts';


const Posts = ({ caption, images }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { allUsers, isLoading, user } = useSelector(state => state.auth);
    const { posts, postLoading, postImages, postSuccess, shared } = useSelector(state => state.post);
    useEffect(() => {
        if (user) {
            dispatch(getAllUsers());
            dispatch(getPostData());
        }
    }, [postImages, user]);

    useEffect(() => {
        if (shared) {
            toast.success('Shared Post Successful!!!');
        }
        dispatch(reset());
    }, [shared]);

    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id,
            post_id: p_id
        };
        dispatch(getPostLikes(likeData));
    };

    const sharePost = (user_id, caption, image) => {
        const data = {
            user_id,
            caption,
            image
        };
        dispatch(sharedPost(data));
    };

    const groupedPosts = posts.reduce((acc, post) => {
        const formattedTime = moment(post.createdAt).format('YYYY-MM-DD HH:mm');
        if (!acc[formattedTime]) {
            acc[formattedTime] = [];
        }
        acc[formattedTime].push(post);
        return acc;
    }, {});

    const renderedTimes = new Set();

    return (
        <>
            {posts?.map((post) => {
                const userData = allUsers.find((user) => user?._id === post?.user);

                return (
                    <div key={post._id}>
                        {Object.keys(groupedPosts).map((time) => {
                            const postsInGroup = groupedPosts[time];
                            if (postsInGroup.length > 1 && !renderedTimes.has(time)) {
                                // Render grouped photos and mark the time as rendered
                                renderedTimes.add(time);
                                return <MorePosts updateLikes={updateLikes} key={time} userData={userData} postsInGroup={postsInGroup} />;
                            } else if (!renderedTimes.has(time)) {
                                // Render single photo as usual and mark the time as rendered
                                renderedTimes.add(time);
                                return (
                                    <div key={time}>
                                        {postsInGroup.map((post, index) => (
                                            <Card key={index} className='my-2'>
                                                {/* Render single photo card */}
                                            </Card>
                                        ))}
                                    </div>
                                );
                            }
                            return null; // If the time has already been rendered, return null
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default Posts;
