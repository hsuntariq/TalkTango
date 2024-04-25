/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createChat, reset } from "../../features/chat/chatSlice";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../features/auth/authSlice";

const UserMessages = ({ _id, username, phone }) => {
    const { user } = useSelector(state => state.auth);
    const { chatError, message, chatSuccess } = useSelector(state => state.chat);
    const dispatch = useDispatch()
    const addChat = (e) => {

        const chatData = {
            sender_id: user?._id, receiver_id: _id
        }
        // console.log(chatData)
        dispatch(createChat(chatData))
    }
    return (
        <Link onClick={addChat} to={`/message-panel/${_id}`} className="flex items-center px-3 justify-between cursor-pointer hover:bg-[#202C33] transition-all">
            <div className="flex items-center  my-2 gap-4 text-white">
                <div className="img rounded-full w-[45px] h-[45px]">
                    <img className='w-full h-full object-cover rounded-full' src={user?.image ? user?.image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
                </div>
                <div className="">
                    <h6>{username}</h6>
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit.
                    </p>
                </div>
            </div>
            <div className="time-info text-end flex justify-end flex-col items-end ">
                <p className="text-gray-700">
                    2.17pm
                </p>
                <div className="h-5 text-end w-5 p-1 flex items-center justify-center rounded-full bg-orange-500">
                    <h6>2</h6>
                </div>
            </div>
        </Link>
    )
}

export default UserMessages
