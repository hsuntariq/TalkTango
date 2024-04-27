import React from 'react'
import vid from '../../assets/vid.mp4'
import { FaChartSimple, FaHeart, FaRibbon, FaShare } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom';
import { Input } from '@mui/material';
import TikComments from './TikComments';

const SingleVideo = () => {
    const url = useLocation();
    console.log(url)
    return (
        <>
            <div className="min-h-screen backdrop-blur-[10px] bg-gradient-to-r from-orange-500 to-rose-800 w-full fixed top-0 flex p-5">
                <video className='min-h-screen rounded-xl w-full object-cover ' muted autoPlay loop src={vid}></video>
                <div className="min-h-screen bg-white w-full">
                    <div className="bg-gray-100 w-3/4 mx-auto rounded-xl">
                        <div className="flex  p-5">
                            <div className="flex">
                                <img className='w-[50px] h-[50px] rounded-full' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/af0a0fe78bded864ea7f1200eb84f556~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1714323600&x-signature=7jMN5VHFcVIS%2FZ35wUvILDul3uA%3D" alt="" />
                                <div className="flex flex-col">
                                    <h5 className="font-bold">
                                        Username
                                    </h5>
                                    <p className="text-gray-600">
                                        Full name
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container w-full p-2 md:p-5 md:w-3/4 mx-auto">

                        <div className="flex justify-between  mx-auto my-4">
                            <div className="items-center flex flex-col">

                                <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                    <FaHeart />
                                </div>
                                <p className="text-gray-500">200</p>
                            </div>
                            <div className="items-center flex flex-col">

                                <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                                    <FaChartSimple />                                </div>
                                <p className="text-gray-500">200</p>
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
                        <div className="bg-gray-100 rounded-xl text-blue-500 font-semibold cursor-pointer p-2  overflow-hidden">
                            http://localost:5173/{url.pathname}
                        </div>

                        {/* comment section */}

                        <TikComments />

                    </div>

                </div>
            </div>
        </>
    )
}

export default SingleVideo
