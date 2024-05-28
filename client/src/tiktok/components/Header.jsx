import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { FaPlus } from 'react-icons/fa6'
import UploadModal from './UploadModal';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="shadow">

                <div className="container mx-auto md:w-3/4 w-full">

                    <div className="flex  justify-between items-center">
                        <div className="logo">
                            <img width="80px" src={logo} alt="" />
                        </div>
                        <div className="flex ms-auto w-full justify-end  gap-3 items-center">
                            {/* <input type="text" placeholder='Search' className="rounded-full p-2 w-1/2 bg-gray-200" /> */}
                            <div onClick={handleOpen} className="border p-2 flex items-center cursor-pointer">
                                <FaPlus />
                                Upload
                            </div>
                            <UploadModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
                            <div className="bg-gradient-to-r text-white font-bold capitalize p-2 from-rose-600 to-orange-300">
                                Salam {user?.username}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
