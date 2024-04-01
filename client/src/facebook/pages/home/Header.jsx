import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import './header.css'
import { MdHome } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { TbUsersMinus } from "react-icons/tb";
import { FormControl } from '@mui/material';
import logo from '../../../assets/logo.png'
const Header = () => {
    return (
        <>
            <div className="flex fixed w-full bg-white z-50 items-center justify-between shadow">

                <div className="search flex items-center justify-between">
                    <div className="img">
                        <img style={{ width: '60px' }} src={logo} alt="" />
                    </div>
                    <div className="search-bar flex items-center border rounded-full px-4">
                        <span>
                            <IoSearchOutline className='text-1xl xl:text-2xl'  />
                        </span>
                        <FormControl type='search' className='border-0' placeholder='Search the Tango' />
                    </div>
                </div>

                <div className="icons text-1xl xl:text-2xl flex gap-10 w-1/2 justify-around ">
                    <MdHome />
                    <CiPlay1 />
                    <BsShop />
                    <TbUsersMinus />
                </div>

                <div className="right">

                </div>
            </div>
        </>
    )
}

export default Header