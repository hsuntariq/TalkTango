import { Link, useNavigate, useParams } from "react-router-dom"
import OtpInput from 'react-otp-input';
import Footer from "./Footer"
import { useEffect, useState } from "react";
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from '../components/loader/Loader'
import { reset, verifyOTP } from "../features/auth/authSlice";
const OTP = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('')
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (isError) {
            toast.error('Invali OTP')
        } else if (isSuccess) {
            navigate('/home')
        }
        dispatch(reset());
    }, [isError, dispatch, isSuccess, navigate, user])
    const verify = () => {
        if (!otp) {
            toast.error('Please enter OTP');
        } else {
            dispatch(verifyOTP({ id, otp }))
        }
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="logo h-[150px] bg-orange-400">
                    <img className="w-[100px] block ms-10 rounded-full " src={logo} alt="" />
                </div>
                <div className="w-full md:w-1/2 mx-auto md:mt-[-50px] rounded-md shadow-lg bg-white">
                    <p className="text-center text-2xl font-bold py-5 text-orange-600">
                        An OTP has been send to your Email address,Please enter the OTP to start the TANGO!
                    </p>
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">

                        <div className="right w-full flex flex-col justify-center items-center test">
                            <OtpInput
                                className='otp'
                                skipDefaultStyles={true}
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                            <div className="left flex flex-col gap-3 justify-between w-full">
                                <button onClick={verify} className="bg-orange-500 w-full my-3 p-2 rounded-full text-white font-bold hover:bg-orange-700">Verify</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OTP
