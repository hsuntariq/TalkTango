import React from 'react'
import { Form } from 'react-bootstrap'
import { IoSearchOutline } from "react-icons/io5";
import './header.css'
import { MdHome } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { TbUsersMinus } from "react-icons/tb";

const Header = () => {
    return (
        <>
            <div className="flex items-center justify-between">

                <div className="search flex items-center justify-between">
                    <div className="img">
                        <img style={{ width: '100px' }} src="https://logowik.com/content/uploads/images/facebook-new-2023-icon9594.logowik.com.webp" alt="" />
                    </div>
                    <div className="search-bar flex items-center border rounded-full px-4">
                        <span>
                            <IoSearchOutline size={30} />
                        </span>
                        <Form.Control type='search' className='border-0' placeholder='Search the facebook' />
                    </div>
                </div>

                <div className="icons text-3xl flex gap-10 w-1/2 justify-around ">
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