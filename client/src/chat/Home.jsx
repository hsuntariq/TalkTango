import { useDispatch, useSelector } from 'react-redux';
import Welcome from './messagebar/Welcome'
import Sidebar from './sidebar/Sidebar'
import { useEffect, useState } from 'react';
import Error from '../components/error/Error';
import { useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import Loader from '../components/loader/Loader';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')
const Home = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [list, SetList] = useState([])
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate, dispatch])



    useEffect(() => {
        socket.on('user_list', (data) => {
            console.log(data)
            SetList(data)
        })
    }, [])

    useEffect(() => {
        socket.emit('user_connected', { id: user?._id })
    }, [])



    return (
        <>


            <div className="flex flex-col md:flex-row w-full sm:overflow-y-scroll h-[100vh]  top-0">

                <Sidebar />
                <Welcome />

            </div>

        </>
    )
}

export default Home
