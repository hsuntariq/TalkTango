import Footer from "./Footer"
import MessageHeader from "./MessageHeader"
import Messages from "./Messages"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import io from 'socket.io-client'
import { createMessage } from "../../features/chat/chatSlice";
const socket = io.connect('http://localhost:5174/');
const MessageScreen = () => {
    const [userInfo, setUserInfo] = useState([]);

    const [message, setMessage] = useState('')
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]); const { receiver_id } = useParams()
    const { chatLoading, chatData } = useSelector(state => state.chat)
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])

    const setRoom = () => {
        socket.emit('join_room', { chatID: chatData?._id })
    }

    const sendMessage = () => {
        const messageData = {
            sender_id: user?._id, receiver_id, message
        }
        // emit the message to the backend server
        socket.emit('sent_message', { message, chatID: chatData?._id })
        setSentMessages([...sentMessages, { message, sent: true, id: chatData?._id, sortID: Date.now() }])

        // return the input to an empty state
        if (!chatLoading) {
            setMessage('')
        }
        dispatch(createMessage(messageData))

    }

    useEffect(() => {
        socket.on('received_message', (data) => {
            setReceivedMessages([...receivedMessages, { message: data, sent: false, id: chatData?._id, sortID: Date.now() }]);
        })
    }, [receivedMessages])

    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
        return a.id - b.id;
    })

    return (
        <div className='w-full sticky top-0 flex flex-col  min-h-screen '>
            <MessageHeader userInfo={userInfo} setUserInfo={setUserInfo} />
            <Messages userInfo={userInfo} receivedMessages={receivedMessages} allMessages={allMessages} />
            <Footer userInfo={userInfo} setRoom={setRoom} sendMessage={sendMessage} setMessage={setMessage} message={message} />
        </div>
    )
}

export default MessageScreen
