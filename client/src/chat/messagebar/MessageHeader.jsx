import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png'
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdVideocam, IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import io from 'socket.io-client'
import { AppContext } from "../../context/Context";
const socket = io.connect('http://localhost:5174')
const MessageHeader = ({ startCall, list }) => {
    const { videoLink } = useContext(AppContext)
    const data = useContext(AppContext)

    const navigate = useNavigate()
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




    const handleVideo = () => {
        socket.emit('incoming_call', { from: user?._id, to: receiver_id, user_from: user?.username, image: user?.image })






    }




    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,
                color: 'white'
            }} className="flex head bg-[#1A2329] justify-between items-center p-1 px-4  text-white">
                <div className="flex items-center gap-2 text-white">

                    <div className="user-image rounded-full w-[45px] h-[45px]">
                        <img src={user?.image ? user?.image : logo} alt="" />

                    </div>
                    <div className="text-1xl text-white">
                        <h1 style={{ color: 'white' }} className="text-1xl text-white">
                            {displayUserInfo()?.username}
                        </h1>
                        {isActive() ? (
                            <p className="text-sm flex items-center text-green-500"> <GoDotFill color="green" /> Online</p>
                        ) : (
                            <p className="text-sm text-gray-500">Offline</p>

                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <IoMdCall className="cursor-pointer text-2xl" />
                    <Link to={`/video/${user?._id}/${receiver_id}`} target="_blank">
                        <IoMdVideocam onClick={handleVideo} className="cursor-pointer text-2xl" />
                    </Link>
                    <HiSearch className="cursor-pointer text-2xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-2xl" />

                </div>
            </div >
        </>
    )
}

export default MessageHeader
