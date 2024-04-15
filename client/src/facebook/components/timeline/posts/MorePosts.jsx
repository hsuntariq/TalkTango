/* eslint-disable react/prop-types */
import { Button, Card } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { ClipLoader } from 'react-spinners'
const MorePosts = ({ userData, postsInGroup, updateLikes }) => {
    const [show, setShow] = useState(false)
    const numPostsToDisplay = show ? postsInGroup.length : (postsInGroup.length >= 5 ? 4 : postsInGroup.length);
    const remainingPostsCount = postsInGroup.length - numPostsToDisplay;
    const { user } = useSelector(state => state.auth);
    const { postLoading } = useSelector(state => state.post);
    return (
        <>
            <Card className='my-2 relative'>

                {remainingPostsCount > 0 && (
                    <div onClick={() => setShow(true)} className="p-4 cursor-pointer font-bold text-3xl absolute bg-black/50 bottom-[7.5%] right-0 w-[48%] text-white flex justify-center items-center top-[59.5%] z-10 ">
                        <h3 className='flex items-center'> <FaPlus /> {remainingPostsCount}</h3>
                    </div>
                )}

                <div className="flex gap-4 items-center">
                    <div className=" p-2 rounded-full">
                        <img style={{ borderRadius: '50%' }} height={35} width={35} src={userData?.image ? userData?.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} />
                    </div>
                    <div className="user-data">
                        <h5 className="font-bold capitalize">{userData?.username}</h5>
                        {postsInGroup && postsInGroup.length > 0 && (
                            <div className="text-gray-600 text-sm">
                                {moment(postsInGroup[0]?.createdAt).fromNow()}
                            </div>
                        )}
                    </div>
                </div>
                <h3 className="ms-8 mb-1">
                    {postsInGroup[0]?.caption}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {postsInGroup.slice(0, numPostsToDisplay).map((post, index) => (
                        <div key={index} className='my-2 border p-1'>
                            <div className='rounded-0'>
                                <div>
                                    <img width={'100%'} className='h-[200px] object-cover' src={post?.image} alt="" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
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
                                        {postLoading ? (
                                            <ClipLoader />
                                        ) : (<BsFillHeartFill color='red' className='text-xl font-bold' />)}
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
                        </div>
                    ))}
                </div>
                {show && <Button onClick={() => setShow(false)}>Hide</Button>}
            </Card >
        </>
    )
}

export default MorePosts
