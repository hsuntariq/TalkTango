import { useState } from "react";
import { HiEmojiHappy, HiMicrophone, HiPlus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createMessage } from "../../features/chat/chatSlice";
import { IoIosSend } from "react-icons/io";
import { Circles } from "react-loader-spinner";

const Footer = () => {
    const [message, setMessage] = useState('')
    const { receiver_id } = useParams()
    const dispatch = useDispatch()
    const { chatLoading } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.auth);
    const sendMessage = () => {
        const messageData = {
            sender_id: user?._id, receiver_id, message
        }
        // console.log(messageData)
        dispatch(createMessage(messageData))
    }
    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex w-full bg-[#1A2329] justify-between items-center  p-3 gap-3 relative md:bottom-[6.8rem] text-white">
                <div className="flex gap-3">
                    <HiEmojiHappy className="cursor-pointer text-2xl" />
                    <HiPlus className="cursor-pointer text-2xl" />
                </div>
                <input style={{
                    background: `rgba(${user?.bgTheme})`
                }} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className={`border focus:outline-none rounded-md w-full p-1`} />
                <HiMicrophone className="cursor-pointer text-2xl" />
                {chatLoading ? <Circles
                    height="20"
                    width="20"
                    color="#F97316"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> :
                    <IoIosSend onClick={sendMessage} className="cursor-pointer text-2xl" />

                }
            </div>
        </>
    )
}

export default Footer
