/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createChat, reset } from "../../features/chat/chatSlice";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../features/auth/authSlice";
import { MdLock } from "react-icons/md";
import BasicModal from "./Modal";

const UserMessages2 = ({ sender_id, receiver_id, phone, chatLock }) => {
    const { user, allUsers } = useSelector(state => state.auth);
    const { chatError, message, chatSuccess } = useSelector(state => state.chat);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const find = allUsers?.find((item) => {
        return item?._id == receiver_id
    })
    const addChat = (e) => {

        const chatData = {
            sender_id, receiver_id
        }
        if (chatLock?.length > 0 && chatLock[0]?.lock === 'true') {
            setShowModal(true);
        } else {
            setShowModal(false)
            dispatch(createChat(chatData));
            // Navigate to the message panel
            // You can replace this with your own navigation logic
            navigate(`/message-panel/${receiver_id}`);
        }
    }
    return (
        <>
            <Link onClick={addChat} className="flex items-center px-3 justify-between cursor-pointer hover:bg-[#202C33] transition-all">
                <div className="flex items-center  my-2 gap-4 text-white">
                    <div className="img rounded-full w-[45px] h-[45px]">
                        <img className='w-full h-full object-cover rounded-full' src={user?.image ? user?.image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
                    </div>
                    <div className="">
                        <h6 className="capitalize">{find?.username}</h6>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit.
                        </p>
                    </div>
                </div>
                <div className="time-info text-end flex justify-end flex-col items-end ">
                    <p className="text-gray-700">

                    </p>
                    <div className="h-5 text-end w-5 p-1 flex items-center justify-center rounded-full bg-orange-500">
                        <h6>{
                            chatLock?.length > 0 && (
                                <>
                                    {chatLock[0]?.lock == 'true' ? <MdLock /> : ''}
                                </>
                            )
                        }</h6>
                    </div>
                </div>
            </Link>
            {showModal && (
                <BasicModal
                    receiver_id={receiver_id}
                    onClose={() => setShowModal(false)} // Pass onClose handler to close the modal
                    key={receiver_id} // Ensure a new modal instance is created when showModal is true
                />
            )}
        </>
    )
}

export default UserMessages2
