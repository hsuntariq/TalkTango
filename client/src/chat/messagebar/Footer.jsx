import { useEffect, useRef, useState } from "react";
import { HiEmojiHappy, HiMicrophone, HiPlus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createMessage } from "../../features/chat/chatSlice";
import { IoIosSend, IoMdClose } from "react-icons/io";
import { Circles } from "react-loader-spinner";
import EmojiPicker from 'emoji-picker-react';
import { IoIosImages } from "react-icons/io";
import { FaPhotoVideo } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdAudiotrack } from "react-icons/md";

const Footer = ({ sendMessage, userInfo, message, setMessage, setRoom, selectedImages, setSelectedImages, handleImageChange }) => {
    const { chatLoading } = useSelector(state => state.chat)
    const [showEmoji, setShowEmoji] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
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
                        <IoMdClose onClick={() => {
                            setShowEmoji(false)
                        }} className="cursor-pointer text-2xl" />
                    ) : (
                        <HiEmojiHappy onClick={() => {
                            setShowEmoji(true)
                            setShowMenu(false)
                        }} className="cursor-pointer text-2xl" />
                    )}
                    <div style={{
                        background: `rgba(${user?.bgTheme})`
                    }} className={`absolute bottom-[40px] opacity-0 left-[40px] border rounded-md  transition ${showMenu ? 'scale-1 opacity-100' : 'scale:0 rotate-[360deg]'} `}>
                        <ul className="list-none">
                            <li className='flex cursor-pointer hover:bg-gray-700 transition px-3 py-1 my-2 gap-3 items-center text-1xl'>
                                <div className="icon"><IoIosImages /></div>
                                <div className="text cursor-pointer relative">
                                    <input type="file" multiple onChange={handleImageChange} className='cursor-pointer absolute opacity-0' />
                                    Image
                                </div>

                            </li>
                            <li className='flex cursor-pointer hover:bg-gray-700 transition px-3 py-1 my-2 gap-3 items-center text-1xl'>
                                <div className="icon"> <FaPhotoVideo /></div>
                                <div className="text"> Video</div>

                            </li>
                            <li className='flex cursor-pointer hover:bg-gray-700 transition px-3 py-1 my-2 gap-3 items-center text-1xl'>
                                <div className="icon"><IoDocument /></div>
                                <div className="text"> Document</div>

                            </li>
                            <li className='flex cursor-pointer hover:bg-gray-700 transition px-3 py-1 my-2 gap-3 items-center text-1xl'>
                                <div className="icon"><MdAudiotrack /></div>
                                <div className="text">Document</div>

                            </li>
                        </ul>
                    </div>
                    <HiPlus onClick={() => {
                        setShowEmoji(false)
                        setShowMenu(!showMenu)
                    }} className={`cursor-pointer transition  text-2xl ${showMenu && 'rotate-45'} `} />
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
