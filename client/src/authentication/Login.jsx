import { Link } from "react-router-dom"
import LogForm from "./LogForm"
import Footer from "./Footer"

const Login = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="logo h-[150px] bg-orange-400">
                    <img className="w-[100px]" src="https://parspng.com/wp-content/uploads/2022/05/orangepng.parspng.com-5.png" alt="" />
                </div>
                <div className="w-full md:w-1/2 mx-auto md:mt-[-50px] rounded-md shadow-lg">
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">

                        <div className="right w-full flex flex-col justify-center items-center ">
                            <LogForm />
                            <div className="left flex flex-col gap-3 justify-between w-full">
                                <div className="mt-auto  flex items-end">New to the App? <Link to="/" className="text-orange-500 font-bold mx-1"> SignUp</Link> instead
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
