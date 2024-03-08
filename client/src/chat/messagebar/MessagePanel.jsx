import Sidebar from "../sidebar/Sidebar"
import MessageScreen from "./MessageScreen"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
const MessagePanel = () => {
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
        <>
            <div className="flex flex-col md:flex-row  w-[100%] h-[100vh] top-0">
                <Sidebar />
                <MessageScreen />
            </div>
        </>
    )
}

export default MessagePanel
