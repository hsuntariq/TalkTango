/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { CircleLoader, ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { cancelFriend } from '../../../features/friends/friendSlice';

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
                <img width={'40px'} style={{ height: '40px', borderRadius: '50%' }} src={image ? image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />
                <div className="info">
                    <h3 className="font-bold text-sm capitalize">{username}</h3>
                    <Button onClick={handleAddFriend} style={{
                        fontSize: '0.7rem',
                        background: checkRequested() ? 'gray' : '#1565C0',
                    }} variant="contained" size="small" disabled={loading}>
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
