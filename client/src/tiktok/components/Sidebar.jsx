import React from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import { FaBell, FaDoorClosed, FaHouse, FaUser } from 'react-icons/fa6'

const Sidebar = () => {
    return (
        <>
            <div className="fixed min-h-screen left-0 p-5 bg-gray-100">
                <ul className="unstyled flex  justify-arounds  flex-col gap-10 text-3xl">
                    <li><FaHouse /></li>
                    <li><FaUser /></li>
                    <li><FaBell /></li>
                    <li><FaUserAltSlash /></li>
                    <li><FaDoorClosed /></li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
