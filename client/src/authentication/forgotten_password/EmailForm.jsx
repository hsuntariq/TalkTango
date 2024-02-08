import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser, reset, sendResetLink } from "../../features/auth/authSlice";
import Skeleton from 'react-loading-skeleton'
const EmailForm = () => {
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
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
        dispatch(sendResetLink({ email }))
        setEmail('')
    }

    if (isLoading) {

        return <>
            <Skeleton width={400} height={30} />
            <Skeleton width={300} />
        </>
    }

    return (
        <>
            <form className="w-full  d-flex flex-col items-center justify-center ">


                <input value={email} onChange={(e) => setEmail(e.target.value)} name="credentials" type="text" placeholder="Enter your registered email address" className="mb-1 p-1 rounded focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />


                <button onClick={sendLink} className={`w-full font-semibold rounded bg-orange-500 text-white p-1 hover:bg-orange-700 transition-all ${isLoading ? 'bg-orange-200' : ''} `}>
                    Send reset link
                </button>
            </form>
        </>
    )
}

export default EmailForm
