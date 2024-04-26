import React from 'react'
import { FaChartSimple, FaHeart, FaRibbon } from 'react-icons/fa6'
import vid from '../../assets/vid.mp4'
import { FaShare } from 'react-icons/fa'
const Content = () => {
    return (
        <>
            <div className="flex justify-center gap-4 w-full">
                <div className="user-image">

                    <img className='w-[70px] h-[70px] rounded-full' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/8312d04e81cb75cfe0d7ccb334e01615~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1714323600&x-signature=qyf7lzvY3H2yBcfqG5xP9ftLDx4%3D" alt="" />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold">
                        Qaisrani Writes
                    </h3>
                    <p className="text-gray-800 w-3/4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, nihil.
                    </p>
                    <div className="flex gap-4">
                        <video className='h-[300px] rounded-xl w-[200px] object-cover ' muted autoPlay loop src={vid}></video>
                        <div className="flex flex-col gap-1 items-center justify-end">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content
