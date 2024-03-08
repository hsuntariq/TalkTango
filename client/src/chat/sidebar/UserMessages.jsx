import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../../components/loader/Loader";
import { createChat } from "../../features/chat/chatSlice";
import Skeleton from 'react-loading-skeleton'
import { useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import Ske from "../../components/loader/Skeleton";

const UserMessages = ({ _id, username, phone }) => {
    const { user } = useSelector(state => state.auth);
    const { chatLoading } = useSelector(state => state.chat);
    const dispatch = useDispatch()
    const addChat = (e) => {

        const chatData = {
            sender_id: user?._id, receiver_id: _id
        }
        // console.log(chatData)
        dispatch(createChat(chatData))
    }
    return (
        <Link onClick={addChat} to={`/message-panel/${_id}/${user?._id}`} className="flex items-center px-3 justify-between cursor-pointer hover:bg-[#202C33] transition-all">
            <div className="flex items-center  my-2 gap-4 text-white">
                <img src="https://github.com/hsuntariq/whatsapp_clone/raw/main/assets/whatsapp.PNG" alt="" className="w-[50px] h-[50px] rounded-full" />
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
