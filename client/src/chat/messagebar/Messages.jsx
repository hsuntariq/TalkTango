/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const Messages = ({ allMessages, handleUpload, userInfo, selectedImages, setSelectedImages, imageLoading }) => {
    const { user, isLoading } = useSelector(state => state.auth);
    const { chatData } = useSelector(state => state.chat);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [respectiveChat, setRespectiveChat] = useState([])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])


    const findChat = () => {

        const foundChat = allMessages.filter((chat) => {
            return chat.id === chatData?._id
        })
        const sortedChat = foundChat.sort((a, b) => a.sortID - b.sortID)
        return sortedChat
    }

    useEffect(() => {
        findChat()
    }, [userInfo?.username])





    return (
        <>
            <div style={{
                backgroundImage: `linear-gradient(rgba(${user?.chatBG},0.6),rgba(${user?.chatBG},0.3)), url('${user?.chatImage ? user?.chatImage : 'https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true'}')`,

            }} className="messages overflow-y-scroll h-[100%] sticky top-0  bg-contain min-h-screen ">

                {findChat()?.map((message) => {
                    return (
                        <>

                            <p>
                                {message.sent ? (
                                    <div className="w-max px-10 py-2 my-2 rounded-full text-white text-1xl ms-auto bg-green-600">
                                        {message.message}
                                    </div>

                                ) : (
                                    <div className="w-max px-10 py-2 my-2 rounded-full text-white text-1xl bg-gray-400">
                                        {message.message}
                                    </div>
                                )}
                            </p>
                        </>
                    )
                })}
                {selectedImages.length > 0 && <div className='image-panel bg-[rgba(168,168,168,0.9)] min-h-screen flex flex-col items-center justify-start bottom-0'>
                    <IoCloseSharp color='white' size={40} className='ms-auto' cursor="pointer" onClick={() => setSelectedImages([])} />
                    <div className="flex images w-3/4 mx-auto gap-4 overflow-x-scroll">
                        {selectedImages?.map((file, index) => {
                            return <img className="w-3/4 mx-auto  aspect-video" key={index} src={URL.createObjectURL(file)} alt="" />
                        })}
                    </div>
                    <div className="container w-3/4 my-10 mx-auto">

                        <form className="rounded-md py-1 flex item-center bg-white px-5 w-full">
                            <input type="text" className="rounded-md bg-transparent py-1 px-5 w-full border-0 focus:border-0 focus:outline-0" placeholder="Write something...." />
                            <span className="self-center">
                                {imageLoading ? (
                                    <ClipLoader />
                                ) : (<IoSend onClick={handleUpload} cursor="pointer" />)}

                            </span>
                        </form>
                    </div>
                </div>}

            </div>

        </>
    )
}

export default Messages
