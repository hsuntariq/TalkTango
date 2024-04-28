import React, { useEffect, useState } from 'react'
import vid from '../../assets/vid.mp4'
import { FaChartSimple, FaHeart, FaRegHeart, FaRibbon, FaShare } from 'react-icons/fa6'
import { useLocation, useParams } from 'react-router-dom';
import { Input } from '@mui/material';
import TikComments from './TikComments';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsData, getVideoLikes, makeComment } from '../../features/video/videoSlice';
import toast from 'react-hot-toast';
import Likes from './Likes';
import { BsFillHeartFill } from 'react-icons/bs';

const SingleVideo = () => {
    const [comment, setComment] = useState('')
    const url = useLocation();
    const { user, allUsers } = useSelector(state => state.auth);
    const { videos, videoError, videoLoading, videoMessage } = useSelector(state => state.video)
    const { user_id, video_id } = useParams()
    const dispatch = useDispatch()
    const findVideo = videos?.find((vid) => {
        return vid?._id == video_id
    })


    // get comments
    useEffect(() => {
        dispatch(getCommentsData({ video_id }))
    }, [dispatch, video_id])



    const handleComment = () => {
        const commentData = {
            user_id: user?._id, video_id, comment
        }

        dispatch(makeComment(commentData))
        toast.success('Comment Added Successfully!')
        setComment('')
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // find likes from the current video
    const likes = allUsers.filter((user) => {
        return findVideo?.likes?.some((like) => like === user?._id);
    });

    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id, video_id: p_id
        }
        dispatch(getVideoLikes(likeData))
    }

    return (
        <>
            <div className="min-h-screen backdrop-blur-[10px] bg-gradient-to-r from-orange-500 to-rose-800 w-full fixed top-0 flex p-5">
                <div className="w-[90%] mx-auto flex">

                    <video className=' rounded-xl w-[50%] object-cover ' controls loop src={findVideo?.video}></video>
                    <div className=" bg-white w-[50%] rounded-xl">
                        <div className="bg-gray-100 w-3/4 mx-auto rounded-xl">
                            <div className="flex  p-5">
                                <div className="flex">
                                    <img className='w-[50px] h-[50px] rounded-full' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/af0a0fe78bded864ea7f1200eb84f556~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1714323600&x-signature=7jMN5VHFcVIS%2FZ35wUvILDul3uA%3D" alt="" />
                                    <div className="flex gap-3 flex-col">
                                        <h5 className="font-bold">
                                            {findVideo?.username}
                                        </h5>
                                        <p className="text-gray-600">
                                            {findVideo?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container p-2 md:p-5 md:w-3/4 mx-auto">

                            <div className="flex justify-between  mx-auto my-4">
                                <div className="items-center flex flex-col">

                                    <div onClick={() => updateLikes(user?._id, video_id)} className="bg-gray-200 p-2 rounded-full cursor-pointer">
                                        {findVideo?.likes?.includes(user?._id) ? (
                                            <div onClick={() => updateLikes(user?._id, video_id)} className="text-center border p-1">
                                                <BsFillHeartFill size={15} color='red' className=' font-bold' />
                                            </div>
                                        ) : (
                                            <div onClick={() => updateLikes(user?._id, video_id)} className=" text-center p-1">
                                                <FaRegHeart size={15} className=' font-bold' />
                                            </div>
                                        )}
                                    </div>
                                    <p onClick={handleOpen} className="text-gray-500 cursor-pointer">
                                        {findVideo?.likes?.length}
                                    </p>
                                    <Likes likes={likes} open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} />
                                </div>
                                <div className="items-center flex flex-col">

                                    <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                        <FaChartSimple />                                </div>
                                    <p className="text-gray-500">
                                        {findVideo?.comments?.length}

                                    </p>
                                </div>

                                <div className="items-center flex flex-col">

                                    <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                        <FaRibbon />
                                    </div>
                                    <p className="text-gray-500">200</p>
                                </div>

                                <div className="items-center flex flex-col">

                                    <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                        <FaShare />
                                    </div>
                                    <p className="text-gray-500">200</p>
                                </div>
                            </div>
                            <div onClick={() => {
                                navigator.clipboard.writeText(`http://localhost:5173${url.pathname}`)
                                toast.success('Copied to clipboard')
                            }} className="bg-gray-100 rounded-xl text-blue-500 font-semibold cursor-pointer p-2  overflow-hidden">
                                http://localhost:5173{url.pathname}
                            </div>

                            {/* comment section */}

                            <TikComments comment={comment} setComment={setComment} handleComment={handleComment} />

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleVideo
