import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getPostData, getPostLikes, reset, sharedPost } from '../../../../features/posts/postSlice';
import 'react-loading-skeleton/dist/skeleton.css'
import Loader from './Loader';
import { getAllUsers } from '../../../../features/auth/authSlice';
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Card, CardHeader } from '@mui/material';

import moment from 'moment'


const Posts = ({ caption, images }) => {
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

    if (postLoading && isLoading) {
        return <Loader />
    }

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

    return (
        <>
            {posts?.map((post) => {
                const userData = allUsers.find((user) => {
                    return user?._id === post?.user
                })
                
                return (
                    <>
                        <Card key={post?._id} className='my-2'>
                            <div className='px-4'>
                                <div className="flex gap-4 items-center">
                                    <div className=" p-2 rounded-full">
                                        <img style={{ borderRadius: '50%' }} height={35} width={35} src={userData?.image ? userData?.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} />
                                    </div>
                                    <div className="user-data">
                                        <h5 className="font-bold capitalize">{userData?.username}</h5>
                                        <p className="text-gray-600 text-sm">
                                            {/* {
                                                new Date(post?.createdAt).toLocaleTimeString('en-US', {
                                                    hour12: true,
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })
                                            } */}
                                            {moment(post?.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-0'>
                                <Link to={`/single-post/${post?._id}/${post?.user}`}>
                                    <img width={'100%'} className='h-[300px] object-cover' src={post?.image} alt="" />
                                </Link>

                            </div>
                            <div className="flex">
                                <p className="text-gray-600 mt-4 ms-2 text-sm font-bold">
                                    {post?.likes.length} likes
                                </p>
                            </div>
                            <div className="flex p-0 m-0 text-center">
                                {
                                    post?.likes?.includes(user?._id) ? (<div onClick={() => updateLikes(user?._id, post?._id)} className="text-center border p-2"><BsFillHeartFill color='red' className='text-xl font-bold' /></div>) : (
                                        <div onClick={() => updateLikes(user?._id, post?._id)} className=" text-center py-2 px-2"><FaRegHeart className='text-xl font-bold' /></div>
                                    )
                                }
                                <div className="text-center px-2 py-2  "><FaRegCommentDots className='text-xl font-bold' /></div>
                                <div onClick={() => sharePost(user?._id, caption, post?.image)} className="py-2 px-2 text-xl"><RiShareForwardLine  /></div>
                            </div>
                        </Card>
                    </>
                )
            })}
        </>
    )
}

export default Posts