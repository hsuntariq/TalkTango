import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";

const Messages = ({ allMessages, userInfo, selectedImages }) => {
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
        console.log(foundChat)
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
                {selectedImages.length > 0 && <div className='image-panel bg-white h-[100%] bottom-0'>

                </div>}

            </div>

        </>
    )
}

export default Messages
