import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const MessageHeader = () => {
    const { user, allUsers } = useSelector(state => state.auth);
    const { receiver_id } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        const userData = allUsers?.find((user) => {
            return user?._id === receiver_id
        })
        setUserInfo(userData)

    }, [receiver_id, allUsers])
    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex head bg-[#1A2329] justify-between items-center p-1 px-4  text-white">
                <div className="flex items-center gap-2">

                    <div className="user-image rounded-full w-[45px] h-[45px]">
                        <img src={user?.image ? user?.image : logo} alt="" />
                    </div>
                    <div className="text-1">
                        {userInfo?.username}
                    </div>
                </div>
                <div className="flex gap-2">
                    <HiSearch className="cursor-pointer text-2xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-2xl" />

                </div>
            </div >
        </>
    )
}

export default MessageHeader
