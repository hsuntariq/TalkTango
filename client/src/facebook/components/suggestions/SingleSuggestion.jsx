/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { CircleLoader, ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { cancelFriend } from '../../../features/friends/friendSlice';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')
const SingleSuggestion = ({ _id, image, username, add, friendLoading }) => {
    const { allUsers, user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const { friends } = useSelector(state => state.friend)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoading(false);
    }, [friendLoading]);

    const handleAddFriend = (e) => {
        setLoading(true);
        if (e.target.innerText == 'ADD') {
            add(_id)
            socket.emit('request_incoming', {
                from: user?._id, to: _id, from_name: user?.username, from_image: user?.image
            })
        } else {
            const data = {
                friend_id: _id, user_id: user?._id
            }
            dispatch(cancelFriend(data)).then(() => {
                toast('Request Deleted!', {
                    icon: '😟'
                })
            })
        }
    };


    const checkRequested = () => {
        const check = friends?.requested?.some(requestedUser => requestedUser == _id);
        return check
    };

    return (
        <>
            <div key={_id} className="flex cursor-pointer hover:shadow-md transition-all hover:scale-105 gap-2 p-2 items-center">
                <div className="img rounded-full w-[45px] h-[45px]">
                    <img className='w-full h-full object-cover rounded-full' src={image ? image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
                </div>
                <div className="info">
                    <h3 className="font-bold text-sm capitalize">{username}</h3>
                    <Button onClick={handleAddFriend} style={{ background: 'linear-gradient(to right, #FEBA00,#FD6700)', color: 'white', fontWeight: 'bold' }} variant="contained" size="small" disabled={loading}>
                        {loading ? <ClipLoader color="white" size={20} /> :
                            checkRequested() ? 'Requested' : 'ADD'
                        }

                    </Button>
                </div>
            </div>
        </>
    )
}

export default SingleSuggestion
