import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import { toast } from 'react-toastify'
import { loginUser, reset } from "../features/auth/authSlice";
const LogForm = () => {
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();




    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/home')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])


    const [formFields, setFormFiels] = useState({
        credentials: '', password: ''
    })
    const { credentials, password } = formFields;
    const handleChange = (e) => {
        setFormFiels((prevVal) => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (!credentials || !password) {
            toast.error('Please enter the relevant fields');
        } else {
            dispatch(loginUser({
                email: credentials, phone: credentials, password: password
            }))
        }
    }

    if (isLoading) {
        return <Loader color="#FB923C" />
    }

    return (
        <>
            <form className="w-full  d-flex flex-col items-center justify-center ">


                <input value={credentials} onChange={handleChange} name="credentials" type="text" placeholder="Email or Phone Number..." className="mb-1 p-1 rounded focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />

                <input name="password" onChange={handleChange} value={password} type="password" placeholder="password..." className="mb-1 p-1 rounded  focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />
                <button onClick={handleClick} className={`w-full  rounded bg-orange-500 text-white p-1 hover:bg-orange-700 transition-all ${isLoading ? 'bg-orange-200' : ''} `}>
                    Register
                </button>
            </form>
        </>
    )
}

export default LogForm
