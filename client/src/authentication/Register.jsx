import { Link, useNavigate } from "react-router-dom"
import RegForm from "./RegForm"
import logo from '../assets/logo.png'
import Footer from "./Footer"
import Loader from "../components/loader/Loader"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Register = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        // if (user) {
        //     // navigate('/home')
        // }
    }, [navigate, user])
    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="logo d-flex justify-center items-center w-full h-[150px] bg-orange-400">
                    <img className="w-[100px] block ms-10 rounded-full " src={logo} alt="" />
                </div>
                <div className="md:w-[90%] mx-auto md:mt-[-50px] rounded-md shadow-lg">
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">
                        <div className="left flex flex-col gap-3 justify-between w-full ">
                            <h1 className="text-3xl md:w-max text-center md:text-start">Use TalkTango on your computer</h1>
                            <ul className="list-none ">
                                <li >1. Open TalkTango</li>
                                <li >2. Register</li>
                                <li >3. Start the <span className="font-medium , text-orange-500">
                                    Tango!</span>  </li>

                            </ul>
                            <div className="mt-auto  flex items-end">Already a user? <Link to="/login" className="mx-1 text-orange-500 font-bold">Login</Link> instead
                            </div>
                        </div>
                        <div className="right flex flex-col justify-center">
                            <RegForm />
                        </div>

                    </div>
                </div>
            </div>
            {/* <Footer /> */}

        </>
    )
}

export default Register
