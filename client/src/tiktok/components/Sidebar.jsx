import React, { useEffect } from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import { FaBell, FaDoorClosed, FaHouse, FaUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BiSolidLogOut } from "react-icons/bi";
import { logoutUser } from '../../features/auth/authSlice'

const Sidebar = () => {
    const { user, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate('/')
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <div className="fixed min-h-screen left-0 p-5 bg-gray-100">
                <ul className="unstyled flex  justify-arounds  flex-col gap-10 text-3xl">
                    <Link to={`/home`} className="flex items-center hover:bg-gray-200 text-gradient-to-r  from-rose-600 to-orange-300  cursor-pointer gap-3 item-center">
                        <FaHouse />
                    </Link>
                    <Link to={`/profile/${user?._id}`} className="flex items-center hover:bg-gray-200  cursor-pointer gap-3 item-center">
                        <FaUser />
                    </Link>
                    <li><FaBell /></li>
                    <li><FaUserAltSlash /></li>
                    <li className='cursor-pointer' onClick={() => {
                        dispatch(logoutUser())
                        navigate('/')
                    }}><BiSolidLogOut /></li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
