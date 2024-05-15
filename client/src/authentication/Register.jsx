import { Link, useNavigate } from "react-router-dom"
import RegForm from "./RegForm"
import logo from '../assets/frontImages/2-removebg.png'
import Footer from "./Footer"
import Loader from "../components/loader/Loader"
import { useSelector } from "react-redux"
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'
import { useEffect, useState } from "react"
const Register = () => {
    const [open, setOpen] = useState(true)
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        // if (user) {
        //     navigate('/home')
        // }
    }, [navigate, user])
    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {open && <RegForm setOpen={setOpen} open={open} />}
            <div className=" min-h-screen relative bg-gray-50">

                <div className="logo d-flex justify-center items-center w-full h-[150px] z-40 bg-orange-400">
                    <img className="w-[100px] z-40 block ms-10 rounded-full " src={logo} alt="" />
                </div>
                <div className="xl:w-1/2 relative md:w-[90%] mx-auto md:mt-[-50px] rounded-md shadow-lg">
                    <div className="flex justify-between items-center flex-col md:flex-row p-10 bg-white border-orange-500 mx-auto">
                        <div className="left flex flex-col gap-3 justify-between w-full ">
                            <img width={'80%'} src={logo} alt="" />
                        </div>
                        <div className="right w-1/2 flex flex-col justify-center">
                            <Typography style={{ textAlign: 'center' }} variant="h6">
                                Lets Start the Tango
                            </Typography>
                            <Button onClick={() => setOpen(true)} style={{ background: 'orange', color: 'black' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Sign Up
                                </Typography>

                            </Button>
                        </div>

                    </div>


                </div>
            </div>
            {/* <Footer /> */}


        </>
    )
}

export default Register
