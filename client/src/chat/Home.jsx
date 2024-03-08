import { useDispatch, useSelector } from 'react-redux';
import Welcome from './messagebar/Welcome'
import Sidebar from './sidebar/Sidebar'
import { useEffect, useState } from 'react';
import Error from '../components/error/Error';
import { useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import Loader from '../components/loader/Loader';

const Home = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])



    if (isLoading) {
        return <Loader />
    }

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
