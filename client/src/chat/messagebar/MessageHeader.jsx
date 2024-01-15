import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png'
const MessageHeader = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <>
            <div className="flex w-full bg-[#1A2329] justify-between items-center p-1 px-4  text-white">
                <div className="flex items-center gap-2">

                    <div className="user-image rounded-full w-[45px] h-[45px]">
                        <img src={user?.newUser?.image ? user?.newUser?.image : logo} alt="" />
                    </div>
                    <div className="text-1">
                        {user?.newUser?.username}
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
