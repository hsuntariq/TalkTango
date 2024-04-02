import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginUser, reset, sendResetLink } from "../../features/auth/authSlice";
import Skeleton from 'react-loading-skeleton'
import ResetPassForm from "./ResetPassForm";
import logo from '../../assets/logo.png'
import Footer from "../Footer";
const ResetPass = () => {
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message)
        }

        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])


    const sendLink = (e) => {
        e.preventDefault();

    }

    if (isLoading) {

        return <>
            <Skeleton width={400} height={30} />
            <Skeleton width={300} />
        </>
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="logo h-[150px] bg-orange-400">
                    <img className="w-[100px]" src={logo} alt="" />
                </div>
                <div className="w-full md:w-1/2 mx-auto md:mt-[-50px] rounded-md shadow-lg">
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">

                        <div className="right w-full flex flex-col justify-center items-center ">

                            <ResetPassForm />

                        </div>

                    </div>
                </div>
            </div>
            <Footer />












        </>
    )
}

export default ResetPass
