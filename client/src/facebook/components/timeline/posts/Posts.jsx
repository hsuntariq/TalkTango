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
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const { allUsers, isLoading, user } = useSelector(state => state.auth)
    const { posts, postLoading, postImages, postSuccess, shared } = useSelector(state => state.post)
    useEffect(() => {
        if (user) {
            dispatch(getAllUsers())
            dispatch(getPostData())
        }
    }, [postImages, user])

    useEffect(() => {
        if (shared) {
            toast.success('Shared Post Successfull!!!')
        }

        dispatch(reset())
    }, [shared])



    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id, post_id: p_id
        }
        dispatch(getPostLikes(likeData))
    }



    const sharePost = (user_id, caption, image) => {
        const data = {
            user_id, caption, image
        }

        dispatch(sharedPost(data))
    }

    const groupedPosts = posts.reduce((acc, post) => {
        const formattedTime = moment(post.createdAt).format('YYYY-MM-DD HH:mm');
        if (!acc[formattedTime]) {
            acc[formattedTime] = [];
        }
        acc[formattedTime].push(post);
        return acc;
    }, {});

    if (postLoading && isLoading) {
        return <Loader />
    }


    return (
        <>
            {posts?.map((post) => {
                const userData = allUsers.find((user) => {
                    return user?._id === post?.user
                })

                return (
                    <>

                        {Object.keys(groupedPosts).map((time) => {
                            const postsInGroup = groupedPosts[time];
                            if (postsInGroup.length > 1) {
                                // Render grouped photos


                                return (
                                    <MorePosts updateLikes={updateLikes} key={time} userData={userData} postsInGroup={postsInGroup} />
                                );
                            } else {
                                // Render single photo as usual
                                return (
                                    <div key={time}>
                                        {postsInGroup.map((post, index) => (
                                            <Card key={index} className='my-2'>
                                                <div className='px-4'>
                                                    <div className="flex gap-4 items-center">
                                                        <div className=" p-2 rounded-full">
                                                            <img style={{ borderRadius: '50%' }} height={35} width={35} src={userData?.image ? userData?.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} />
                                                        </div>
                                                        <div className="user-data">
                                                            <h5 className="font-bold capitalize">{userData?.username}</h5>
                                                            <p className="text-gray-600 text-sm">
                                                                {moment(post?.createdAt).fromNow()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='rounded-0'>
                                                    <h3 className="ms-8 mb-1">
                                                        {post.caption}
                                                    </h3>
                                                    <div >
                                                        <img width={'100%'} className='h-[300px] object-cover' src={post?.image} alt="" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-gray-600 mt-4 ms-2 text-sm font-bold">
                                                        {post?.likes.length} likes
                                                    </p>
                                                    <Link to={`/single-post/${post?._id}/${post?.user}`} className="self-end font-bold text-gray-600 pe-2 text-sm">
                                                        {post?.comments?.length > 0 ? (`${post?.comments?.length} comments`) : 'No comments'}
                                                    </Link>
                                                </div>
                                                <div className="flex p-0 m-0 text-center">
                                                    {post?.likes?.includes(user?._id) ? (
                                                        <div onClick={() => updateLikes(user?._id, post?._id)} className="text-center border p-2">
                                                            <BsFillHeartFill color='red' className='text-xl font-bold' />
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => updateLikes(user?._id, post?._id)} className=" text-center py-2 px-2">
                                                            <FaRegHeart className='text-xl font-bold' />
                                                        </div>
                                                    )}
                                                    <Link to={`/single-post/${post?._id}/${post?.user}`} className="text-center px-2 py-2">
                                                        <FaRegCommentDots className='text-xl font-bold' />
                                                    </Link>
                                                    <div onClick={() => sharePost(user?._id, post.caption, post?.image)} className="py-2 px-2 text-xl">
                                                        <RiShareForwardLine />
                                                    </div>

                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                );
                            }
                        })}

                    </>
                )
            })}
        </>
    )
}

export default Posts