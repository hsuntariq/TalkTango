import { Link } from "react-router-dom"
import LogForm from "../LogForm"
import Footer from "../Footer"
import logo from '../../assets/logo.png'
import EmailForm from "./EmailForm"
import Skeleton from "react-loading-skeleton"

const EnterEmail = () => {


    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="logo h-[150px] bg-orange-400">
                    <img className="w-[100px]" src={logo} alt="" />
                </div>
                <div className="w-full md:w-1/2 mx-auto md:mt-[-50px] rounded-md shadow-lg">
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">

                        <div className="right w-full flex flex-col justify-center items-center ">

                            <EmailForm />

                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EnterEmail
