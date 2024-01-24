import { useEffect, useRef, useState } from "react";
import { HiEmojiHappy, HiMicrophone, HiPlus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createMessage } from "../../features/chat/chatSlice";
import { IoIosSend, IoMdClose } from "react-icons/io";
import { Circles } from "react-loader-spinner";
import EmojiPicker from 'emoji-picker-react';

const Footer = ({ sendMessage, userInfo, message, setMessage, setRoom }) => {
    const { chatLoading } = useSelector(state => state.chat)
    const [showEmoji, setShowEmoji] = useState(false);
    const { user } = useSelector(state => state.auth);
    const focus = useRef();
    useEffect(() => {
        focus.current.focus();
        setRoom()
    }, [userInfo?.username])





    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex w-full bg-[#1A2329] justify-between items-center  p-3 gap-3 relative md:bottom-[6.8rem] text-white">
                <div className="flex gap-3 relative">
                    <div className={`absolute bottom-[30px]  transition ${showEmoji ? 'opacity-1 scale-1 ' : 'opacity-0 scale-0 '}`}>
                        <EmojiPicker onEmojiClick={(e) => {
                            setMessage(prevValue => prevValue + e.emoji)
                        }} />
                    </div>

                    {showEmoji ? (
                        <IoMdClose onClick={() => setShowEmoji(false)} className="cursor-pointer text-2xl" />
                    ) : (
                        <HiEmojiHappy onClick={() => setShowEmoji(true)} className="cursor-pointer text-2xl" />
                    )}
                    <HiPlus className="cursor-pointer text-2xl" />
                </div>
                <input ref={focus} onFocus={setRoom} style={{
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
