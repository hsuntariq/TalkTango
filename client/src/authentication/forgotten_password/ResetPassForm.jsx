import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { reset, resetPassword, sendResetLink } from '../../features/auth/authSlice';
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton';
import { IoArrowBack } from "react-icons/io5";
const ResetPassForm = () => {
    const [pass, setPass] = useState('');
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const { id } = useParams()
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


    const updatePassword = (e) => {
        e.preventDefault();
        if (!pass) {
            toast.error('Please enter the new password')
        } else {
            const data = {
                token: id, newPassword: pass
            }
            dispatch(resetPassword(data))

        }

    }




    if (isLoading) {

        return <>
            <div className="w-full  d-flex flex-col items-center justify-center ">

                <Skeleton className='block mx-auto ' width={400} height={30} />
                <Skeleton className='block mx-auto' width={300} />
            </div>
        </>
    }

    return (
        <form className="w-full  d-flex flex-col items-center justify-center ">


            <input value={pass} onChange={(e) => setPass(e.target.value)} name="credentials" type="password" placeholder="Enter your new password" className="mb-1 p-1 rounded focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />



            <button onClick={updatePassword} className={`w-full font-semibold rounded bg-orange-500 text-white p-1 hover:bg-orange-700 transition-all ${isLoading ? 'bg-orange-200' : ''} `}>
                Reset password
            </button>
            <Link to="/login" className="flex  items-center justify-end gap-2 mt-2 text-orange-500 ms-auto  text-end font-bold" >
                <IoArrowBack /> Back to login page
            </Link>
        </form>
    )
}

export default ResetPassForm