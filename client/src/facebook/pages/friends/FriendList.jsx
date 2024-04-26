import React, { useEffect } from 'react'
import { getFriends } from '../../../features/friends/friendSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../features/auth/authSlice';
import Skeleton from 'react-loading-skeleton';
import { Button, Card } from '@mui/material';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';

const FriendList = () => {
    const { user, allUsers, isLoading } = useSelector(state => state.auth);
    const { friends, friendLoading } = useSelector(state => state.friend);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getFriends(user?._id))
    }, [])


    const findFriends = () => {
        const users = allUsers?.filter((user, index) => {
            return user?._id == friends[index]
        })


        return users
    }


    // if (friendLoading || isLoading) {
    //     return 
    // }
    if (friendLoading || isLoading) {
        return (
            <>
                <div className="grid grid-cols-2 gap-3 mt-[4rem]">
                    {Array.from({ length: 10 }).map((_, index) => {
                        return <Card key={index} className="flex p-3 gap-4 items-center">
                            <Skeleton width={100} height={100} circle />
                            <div>
                                <Skeleton width={150} height={20} />
                                <Skeleton width={50} height={20} />
                            </div>

                        </Card>
                    })}


                </div>
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-2 mt-[4rem] ">
                {findFriends()?.map((item, index) => {
                    return (
                        <Link key={index} to={`/profile/${item?._id}`}>
                            <Card key={index} className="flex p-3 m-3 gap-4 items-center">
                                <img className='w-[100px] h-[100px] bg-gray-100 object-contain rounded-full' src={item?.image ? item?.image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
                                <div>
                                    <h4 className='capitalize font-bold text-orange-500'>{item?.username}</h4>
                                    <h4>{item?.username}</h4>
                                    <Button size="small" style={{ background: 'linear-gradient(to right, #FEBA00,#FD6700)', color: 'white', fontWeight: 'bold' }}>
                                        Friends <IoMdArrowDropdown />
                                    </Button>
                                </div>

                            </Card>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default FriendList