import Sidebar from "../sidebar/Sidebar"
import MessageScreen from "./MessageScreen"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')
const MessagePanel = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [list, SetList] = useState([])
    const { receiver_id } = useParams()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate, dispatch])


    useEffect(() => {
        socket.emit('user_connected', { id: user?._id })
        socket.on('user_list', (data) => {
            SetList(data)
        })

    }, [receiver_id])


    return (
        <>
            <div className="flex flex-col md:flex-row  w-[100%] h-[100vh] top-0">
                <Sidebar />
                <MessageScreen list={list} />
            </div>
        </>
    )
}

export default MessagePanel
