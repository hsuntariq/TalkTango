import { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { settings } from "./list";
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaUnlock, FaPaintRoller, FaCross, } from "react-icons/fa";
import { SketchPicker } from 'react-color';
import { reset, setTheme } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { BarLoader, ClipLoader } from "react-spinners";

const Settings = ({ show, toggleSettings }) => {
    const [setting, setSettings] = useState(settings)
    const [color, setColor] = useState(''); // Initial color
    const [openThemes, setOpenThemes] = useState(false);
    const [bgTheme, setBgTheme] = useState('')
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    };
    const { user, isLoading, isError, message, themeSuccess } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isError) {
            toast(message)
        } if (themeSuccess) {
            toast('Theme updated successfully!')
        }
        dispatch(reset());
    }, [user, navigate, isError, message, themeSuccess, dispatch])
    const setThemeColor = (e) => {
        e.preventDefault()
        const themeData = {
            id: user?._id, theme: color
        }
        // console.log(themeData)


        dispatch(setTheme(themeData))
    }

    return (
        <>
            <div ref={show} style={{
                background: `${user?.bgTheme || '#121A1E'}`,

            }} className={`min-h-screen translate-x-[-100%] transition w-full fixed top-0 z-20`}>
                <div className="h-[100px]" style={{
                    background: `${user?.bgTheme || '#121A1E'}`
                }}>
                    <div className="flex font-normal px-4 py-3 text-2xl gap-4 text-white mt-auto items-end h-full">
                        <IoArrowBack onClick={toggleSettings} size={30} color='white' cursor="pointer" />
                        <h1>Settings</h1>
                    </div>

                </div>
                <div className="flex text-white items-center gap-2">
                    <div className="user-image">
                        <img src={logo} width={'100px'} alt="" />
                    </div>
                    <div className="user-name text-3xl capitalize">
                        <h1>
                            {user?.username}
                        </h1>
                    </div>
                </div>
                <ul className="list-none text-white flex flex-col gap-3  ">

                    <li className="flex gap-3 py-1 hover:bg-[#222f4b] cursor-pointer transition px-4">
                        <div className="icon text-3xl">
                            <FaUnlock />
                        </div>
                        <div className="text">
                            <h3>Privacy</h3>
                        </div>
                    </li>
                    <li className="flex gap-3 py-1 hover:bg-[#222f4b] cursor-pointer transition px-4">
                        <div className="icon text-3xl">
                            <FaBell />
                        </div>
                        <div className="text">
                            <h3>Notification</h3>
                        </div>
                    </li>
                    <li onClick={() => setOpenThemes(true)} className="flex gap-3 py-1 hover:bg-[#222f4b] cursor-pointer transition px-4">
                        <div className="icon text-3xl">
                            <FaPaintRoller />
                        </div>
                        <div className="text">
                            <h3>Theme</h3>
                        </div>
                    </li>
                    <div style={{
                        background: `${user?.bgTheme}`
                    }} className={`w-[350px] transition-[1s] min-h-screen bg-[#1A2329] z-50 fixed top-0 ${openThemes || 'translate-y-[100%]'}`}>
                        <IoClose size={40} cursor='pointer' onClick={() => setOpenThemes(false)} />
                        <div className="picker w-full flex flex-col items-center justify-center">
                            <SketchPicker color={color} onChange={handleColorChange} className='w-full' />
                            <button disabled={isLoading} onClick={setThemeColor} className={`w-1/2 my-3 flex justify-center items-center bg-blue-600 py-1 rounded-full hover:bg-blue-800 ${isLoading && 'bg-blue-900 text-white disabled cursor-not-allowed'}`}>
                                {isLoading ?
                                    <div className='flex flex-col justify-center items-center gap-2 '>
                                        <p>Updating...</p>
                                        <BarLoader
                                            color="white"
                                            loading={isLoading}
                                            size={30}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"

                                        /></div> : 'Upate theme'}
                            </button>
                        </div>


                    </div>

                </ul>
            </div>
        </>
    )
}

export default Settings
