import React from 'react'
import { useSelector } from 'react-redux'
import { SyncLoader } from 'react-spinners'
import { PiVideoBold } from "react-icons/pi";
import { Card } from '@mui/material';
import { FaCalendarAlt } from 'react-icons/fa';
import { RiGalleryLine, RiUserLine } from 'react-icons/ri';
import { MdSave } from 'react-icons/md';
import { PiTagChevronFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { user, isLoading } = useSelector(state => state.auth)
    if (isLoading) {
        return <SyncLoader />
    }
    return (
        <>
            <Card className="min-h-screen bg-white sticky top-10">

                <div className="flex items-center justify-between  gap-3 p-4 pt-5  hover:bg-gray-200">
                    <h3 className="font-bold text-dark text-1xl">
                        Home
                    </h3>
                    <button className="text-blue-500">
                        Create
                    </button>
                </div>
                <div className="flex text-sm flex-col gap-5 xl:gap-10 p-4">
                    <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <PiVideoBold color='blue' />
                        <h4>Watch</h4>
                    </div>
                    <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <FaCalendarAlt color="hotpink" />
                        <h4>Events</h4>
                    </div>
                    <Link to='/friends' className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <RiUserLine color="orange" />
                        <h4>Friends</h4>
                    </Link>
                    <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <RiGalleryLine color='green' />
                        <h4>Memories</h4>
                    </div>
                    <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <PiTagChevronFill color="red" style={{ rotate: '90deg' }} />
                        <h4>Saved</h4>
                    </div>
                    <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer gap-3 item-center">
                        <IoMdSettings color="yellow" style={{ rotate: '90deg' }} />
                        <h4>Settings</h4>
                    </div>
                </div>
                <hr />
            </Card>

        </>
    )
}

export default Sidebar