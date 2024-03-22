import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png'
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoMdVideocam, IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const MessageHeader = ({ startCall, list }) => {

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





    const isActive = () => {
        const check = list.find((id) => {
            return id == displayUserInfo()?._id
        })
        return check;
    }




    const handleVideoCall = () => {
        startCall();

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
                        {isActive() ? (
                            <p className="text-sm flex items-center text-green-500"> <GoDotFill color="green" /> Online</p>
                        ) : (
                            <p className="text-sm text-gray-500">Offline</p>

                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <IoMdCall className="cursor-pointer text-2xl" />
                    <IoMdVideocam onClick={handleVideoCall} className="cursor-pointer text-2xl" />
                    <HiSearch className="cursor-pointer text-2xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-2xl" />

                </div>
            </div >
        </>
    )
}

export default MessageHeader
