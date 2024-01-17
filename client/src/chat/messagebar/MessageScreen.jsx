import Footer from "./Footer"
import MessageHeader from "./MessageHeader"
import Messages from "./Messages"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
const MessageScreen = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])
    return (
        <div className='w-full sticky top-0 flex flex-col  min-h-screen '>
            <MessageHeader />
            <Messages />
            <Footer />
        </div>
    )
}

export default MessageScreen
