import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdCall } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { toast } from 'react-toastify'
const MessageHeader = () => {
    const { user, allUsers } = useSelector(state => state.auth);
    const { receiver_id } = useParams();
    const displayUserInfo = () => {
        const userData = allUsers?.find((user) => {
            return user?._id === receiver_id
        })

        return userData;
    }
    useEffect(() => {
        displayUserInfo()
    }, [receiver_id])


    const makeCall = async () => {
        try {
            const videoStream = navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        } catch (error) {
            toast.error('Access denied')
        }
    }


    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex head bg-[#1A2329] justify-between items-center p-1 px-4  text-white">
                <div className="flex items-center gap-2">

                    <div className="user-image rounded-full w-[45px] h-[45px]">
                        <img src={user?.image ? user?.image : logo} alt="" />
                    </div>
                    <div className="text-1xl">
                        {displayUserInfo()?.username}
                    </div>
                </div>
                <div className="flex gap-4">
                    <MdCall className="cursor-pointer text-2xl" />
                    <IoMdVideocam className="cursor-pointer text-2xl" />
                    <HiSearch className="cursor-pointer text-2xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-2xl" />
                </div>
            </div >
        </>
    )
}

export default MessageHeader
