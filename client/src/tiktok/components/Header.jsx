import React from 'react'
import logo from '../../assets/logo.png'
import { FaPlus } from 'react-icons/fa6'

const Header = () => {
    return (
        <>
            <div className="shadow">

                <div className="container mx-auto md:w-3/4 w-full">

                    <div className="flex  justify-between items-center">
                        <div className="logo">
                            <img width="80px" src={logo} alt="" />
                        </div>
                        <div className="flex ms-auto w-full justify-end  gap-3 items-center">
                            <input type="text" placeholder='Search' className="rounded-full p-2 w-1/2 bg-gray-200" />
                            <div className="border p-2 flex items-center">
                                <FaPlus />
                                Upload
                            </div>
                            <div className="bg-gradient-to-r p-2 from-rose-600 to-orange-300">
                                Log in
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
