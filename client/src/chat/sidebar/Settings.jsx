import { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { settings } from "./list";
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaUnlock, FaPaintRoller, } from "react-icons/fa";
import { reset, setChatTheme, setTheme } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { BarLoader, ClipLoader } from "react-spinners";
import { IoIosColorPalette } from "react-icons/io";
import SetThemePanel from "./SetThemePanel";
import SetChatTheme from "./SetChatTheme";

const Settings = ({ show, toggleSettings }) => {
    const [color, setColor] = useState(''); // Initial color
    const [color2, setColor2] = useState({ r: 255, g: 0, b: 0, a: 1 });
    const [openThemes, setOpenThemes] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [bgTheme, setBgTheme] = useState('')
    const handleColorChange = (newColor) => {
        setColor(newColor.rgb);
    };
    const handleColorChange2 = (newColor) => {
        setColor2(newColor.rgb);
    };
    const { user, isLoading, themeLoading, isError, message, themeSuccess } = useSelector(state => state.auth);
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
            id: user?._id, theme: `${color.r},${color.g},${color.b}`,
        }

        // console.log(`${color.r},${color.g},${color.b}`)

        dispatch(setTheme(themeData))
    }
    const chatTheme = (e) => {
        e.preventDefault()
        const themeData = {
            id: user?._id, chatImage: user?.chatImage ? user?.chatImage : null, chatBG: `${color2.r},${color2.g},${color2.b}`
        }
        // console.log(themeData)


        dispatch(setChatTheme(themeData))
    }

    return (
        <>
            <div ref={show} style={{
                background: `rgba(${user?.bgTheme})`,

            }} className={`min-h-screen translate-x-[-100%] transition  absolute w-full top-0 `}>
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
                <ul className="list-none text-white flex flex-col gap-3 w-full">

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
                    <li onClick={() => setChatOpen(true)} className="flex gap-3 py-1 hover:bg-[#222f4b] cursor-pointer transition px-4">
                        <div className="icon text-3xl">
                            <IoIosColorPalette />
                        </div>
                        <div className="text">
                            <h3>Change Chat Image</h3>
                        </div>
                    </li>
                    <SetChatTheme chatOpen={chatOpen} setChatOpen={setChatOpen} />

                    <SetThemePanel openThemes={openThemes} setOpenThemes={setOpenThemes} color={color} handleColorChange={handleColorChange} setThemeColor={setThemeColor} color2={color2} handleColorChange2={handleColorChange2} chatTheme={chatTheme} />

                </ul>
            </div>
        </>
    )
}

export default Settings
