import React, { useEffect } from 'react'
import { FaChartSimple, FaHeart, FaRegHeart, FaRibbon } from 'react-icons/fa6'
import vid from '../../assets/vid.mp4'
import { FaShare } from 'react-icons/fa'
import SingleVideo from './SingleVideo'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoData, getVideoLikes, reset } from '../../features/video/videoSlice'
import { toast } from 'react-hot-toast';
import { getAllUsers } from '../../features/auth/authSlice'
import { ClipLoader } from 'react-spinners'
import { BsFillHeartFill } from 'react-icons/bs'
const Content = () => {
    const { user, allUsers } = useSelector(state => state.auth)
    const { videos, videoError, videoLoading, videoMessage } = useSelector(state => state.video)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
        if (videoError) {
            toast.error(videoMessage)
        }
        dispatch(getVideoData())


        dispatch(reset())
    }, [dispatch, videoError, videoMessage])




    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id, video_id: p_id
        }
        dispatch(getVideoLikes(likeData))
    }


    return (
        <>
            <div className="flex flex-col w-full justify-center gap-4">

                {videos?.map((vid) => {
                    const findUser = allUsers?.find((item) => {
                        return item?._id == vid?.user
                    })

                    return (
                        <>
                            <div className="flex justify-center gap-4 w-full">
                                <div className="user-image">

                                    <img className='w-[50x] h-[50px] rounded-full' src={findUser?.image ? findUser?.image : 'http://localhost:5173/src/assets/logo.png'} alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold">
                                        {findUser?.username}
                                    </h3>
                                    <p className="text-gray-800 w-3/4 mb-2">
                                        {vid?.caption ? vid?.caption : 'TalkTango Creates'}
                                    </p>
                                    <div className="flex gap-4">
                                        <Link to={`/single-video/${vid?.user}/${vid?._id}`}>
                                            <video className='h-[300px] xl:w-[600px] rounded-xl w-[200px] object-cover ' controls src={vid?.video}></video>
                                        </Link>
                                        <div className="flex flex-col gap-1 items-center justify-end">
                                            <div className="items-center flex flex-col">

                                                <div onClick={() => updateLikes(user?._id, vid?._id)} className="bg-gray-200 p-2 rounded-full cursor-pointer">
                                                    {vid?.likes?.includes(user?._id) ? (
                                                        <div onClick={() => updateLikes(user?._id, vid?._id)} className="text-center border p-2">
                                                            <BsFillHeartFill size={15} color='red' className=' font-bold' />
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => updateLikes(user?._id, vid?._id)} className=" text-center p-2">
                                                            <FaRegHeart size={15} className=' font-bold' />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-gray-500">{vid?.likes?.length ?? 0}</p>
                                            </div>
                                            <div className="items-center flex flex-col">

                                                <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                                    <FaChartSimple />                                </div>
                                                <p className="text-gray-500">
                                                    {vid?.comments?.length ?? 0}
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
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>


        </>
    )
}

export default Content
