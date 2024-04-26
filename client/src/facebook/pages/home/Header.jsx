import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import './header.css'
import { MdHome } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { TbUsersMinus } from "react-icons/tb";
import { FormControl, Card, Button } from '@mui/material';
import logo from '../../../assets/logo.png'
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { getRequestData } from '../../../features/notifications/notificationSlice';
import { Link, useParams } from 'react-router-dom';
import { accceptFriend, addFriendData } from '../../../features/friends/friendSlice';
import { toast } from 'react-hot-toast'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')
const Header = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const { user, allUsers } = useSelector(state => state.auth);
    const { requests } = useSelector(state => state.notification);
    const { user_id } = useParams()
    useEffect(() => {
        dispatch(getRequestData(user_id))
        socket.on('new_request', (data) => {
            if (data.to === user?._id) {
                toast(`New request from ${data.from_name}`, {
                    icon: '🙌'
                })
            }
        });
    }, [dispatch, user_id, socket])



    useEffect(() => {
        const handleFriendAccepted = (data) => {
            if (data.to === user?._id) {
                toast(`friend request accepted by ${data.from_name}`, {
                    icon: '🙌'
                })
            }
        };

        socket.on('friend_accepted', handleFriendAccepted);

        return () => {
            socket.off('friend_accepted', handleFriendAccepted);
        };
    }, []);


    const acceptRequest = (from, to, from_name) => {
        const name = allUsers.find(item => item?._id == from)
        socket.emit('accept', { from: to, to: from, from_name: name?.username })
        dispatch(accceptFriend({
            from, user: to
        })).then((res) => {
            toast.success('Friend Accepted Successfully', {
                icon: '🤗'
            })
        }).catch((error) => {
            toast.error(error)
        })
    }

    return (
        <>
            <div className="flex fixed w-full bg-white z-50 items-center justify-between shadow">

                <div className="search flex items-center justify-between">
                    <div className="img">
                        <img style={{ width: '60px' }} src={logo} alt="" />
                    </div>
                    <div className="search-bar flex items-center border rounded-full px-4">
                        <span>
                            <IoSearchOutline className='text-1xl xl:text-2xl' />
                        </span>
                        <FormControl type='search' className='border-0' placeholder='Search the Tango' />
                    </div>
                </div>

                <div className="icons text-1xl xl:text-2xl flex gap-10 w-1/2 justify-around ">
                    <MdHome />
                    <Link to={`/tik-home/${user?._id}`}>
                        <CiPlay1 />
                    </Link>
                    <Link to='/home'>
                        <IoChatbubbleEllipsesOutline />
                    </Link>
                    <div className="notifications relative">
                        <div className="requests relative">
                            {requests?.length && requests?.length > 0 ?
                                (<div style={{ clipPath: 'circle()' }} className="absolute bg-gradient-to-t from-pink-500 to-violet-500 text-white font-bold text-center  p-1 -top-5 -right-2 text-sm">
                                    {requests?.length}
                                </div>)
                                :
                                null}
                            <TbUsersMinus className='cursor-pointer' onClick={() => setShow(!show)} />
                        </div>
                        {show ? (
                            requests && requests.length > 0 ? (
                                <Card className="bg-gray-400 w-max p-5 -translate-x-full p-3 absolute">
                                    {requests.map((item) => {

                                        const findUser = allUsers.find((u) => u?._id === item.from);

                                        return (
                                            <div key={item._id} className="bg-gray-100 my-1  transition-all  cursor-pointer flex item-center p-3">
                                                <img width={'40px'} style={{ height: '40px', borderRadius: '50%' }} src={findUser?.image || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />
                                                <div className="flex flex-col">
                                                    <h5 className="font-bold text-sm">
                                                        New Friend Request
                                                    </h5>
                                                    <p className="text-sm">
                                                        <span className="font-bold text-blue-500 me-1 capitalize">
                                                            {findUser?.username}
                                                        </span>
                                                        wants to be your friend
                                                    </p>
                                                    <button onClick={() => acceptRequest(item?.from, item?.to)} className="bg-gradient-to-r border-none  text-sm w-full  from-pink-800 font-bold to-purple-600 text-white hover:bg-gradient-to-bl transition py-1 px-4  rounded-full ">
                                                        Accept
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Card>
                            ) : (
                                <Card className="bg-gray-400 w-max -translate-x-full p-3 absolute">
                                    <div className="bg-gray-100 my-1 hover:scale-110 transition-all hover:shadow cursor-pointer flex item-center p-3">
                                        <h5 className="font-bold">
                                            No new requests
                                        </h5>
                                    </div>
                                </Card>
                            )
                        ) : null}

                    </div>

                </div>

                <div className="right flex gap-3 pe-5">
                    <div className="notifications relative">
                        <FaRegBell />
                        <Card className="bg-gray-400 -translate-x-full p-3 absolute">
                            <h1>hello</h1>
                        </Card>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header