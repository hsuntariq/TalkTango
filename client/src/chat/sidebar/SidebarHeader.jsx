import { TiMessages, TiGroupOutline } from "react-icons/ti";
import { SiMediamarkt } from "react-icons/si";
import { HiOutlineDotsVertical, HiOutlineX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SidebarHeader = ({ toggleSettings }) => {
    const { user, isSuccess } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false)
    const show = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        dispatch(reset())
    }, [navigate, user, dispatch])

    const openMenu = () => {
        setOpen(!open)
        show.current.classList.toggle('scale-100')
    }

    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex justify-between items-center px-3 p-1 bg-[#202C33]">
                <div className="user-image  rounded-full w-[45px] h-[45px]">
                    <img className='w-full h-full object-cover rounded-full' src={user?.image ? user?.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="" />
                </div>
                <div className="icons text-1xl text-white flex gap-4">
                    <TiMessages className="transition-all  cuhttps://icon-library.com/images/user-image-icon/user-image-icon-9.jpgrsor-pointer " />
                    <TiGroupOutline className="cursor-pointer" />
                    <SiMediamarkt className="transition-all cursor-pointer" />
                    <div className="relative">
                        {open ? (<HiOutlineX onClick={openMenu} className="cursor-pointer  text-red-600" />) : (
                            <HiOutlineDotsVertical onClick={openMenu} className="cursor-pointer" />


                        )}
                        <div style={{
                            background: `rgba(${user?.bgTheme})`,
                            border: '1px solid black'
                        }} ref={show} className="flex-flex-col rounded-md bg-[#17242c] absolute right-1 scale-0 top-5 transition">
                            <ul className="list-unstyled  flex flex-col gap-1 text-white font-semibold py-2 ">
                                <li onClick={toggleSettings} className="cursor-pointer w-full px-4 py-1 transition-all hover:bg-gray-400 mt-1">Setting</li>
                                <li onClick={() => {
                                    dispatch(logoutUser())
                                    navigate('/')
                                }} className="cursor-pointer w-full px-4 py-1 transition-all hover:bg-gray-400 ">Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarHeader
