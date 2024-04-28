/* eslint-disable react/prop-types */
import { Input } from '@mui/material'
import Skeleton from 'react-loading-skeleton'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Comments from '../../facebook/components/singlePost/Comments';
import { getAllUsers } from '../../features/auth/authSlice'
const TikComments = ({ comment, setComment, handleComment }) => {
    const { allUsers } = useSelector(state => state.auth);
    const { commentLoading, comments } = useSelector(state => state.video);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())

    }, [dispatch])
    useEffect(() => {
        if (comment.length > 0) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [comment])
    return (
        <>
            <div className="flex">
                Comments ({comments?.length})
            </div>
            <hr />
            <div className="my-3 h-[200px] overflow-y-scroll">

                <div className="flex h-[200px] overflow-y-scroll flex-col gap-1">
                    {commentLoading ? (

                        <div className="flex gap-4">
                            <Skeleton width={30} height={30} circle />
                            <div className="flex flex-col">
                                <Skeleton width={200} height={9} />
                                <Skeleton width={100} height={9} />
                            </div>
                        </div>





                    ) : (comments?.map((comment, index) => {
                        const findUser = allUsers.find((user) => {
                            return user?._id == comment?.user_id
                        })
                        return (
                            <>
                                <Comments key={index} {...comment} findUser={findUser} commentUser={comment?.user_id} comment_id={comment?.id} />
                            </>
                        )
                    }))}
                </div>
            </div>
            <div className="flex items-center">

                <Input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='p-2 w-full' placeholder='Add a comment...' />
                <IoIosSend onClick={handleComment} size={20} className={`transition-all ${show ? 'translate-y-[0px] opacity-100' : 'translate-y-[-20px] opacity-0'} `} />
            </div>
        </>
    )
}

export default TikComments
