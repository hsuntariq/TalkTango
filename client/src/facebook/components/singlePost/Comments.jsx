/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';
import { MdOutlineReport } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import { GoReply } from "react-icons/go";
import UpdateModal from './UpdateModal';
import { deleteComment } from '../../../features/posts/postSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Comments = ({ findUser, date, comment, commentUser, comment_id }) => {
    const [open, setOpen] = useState(false)
    const [openReply, setOpenReply] = useState(false)
    const [readMore, setReadMore] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { id } = useParams()
    const dispatch = useDispatch()
    const handleClose = () => {
        setOpenReply(false)
    }

    const handleDeleteComment = (comm_id) => {
        const data = {
            post_id: id, comment_id: comm_id
        }
        dispatch(deleteComment(data))
        toast.success('Comment Deleted successfully', {
            icon: <FaTrashAlt color="red" />
        })


    }
    return (
        <div className="flex ps-3 gap-3">
            <img className='w-[30px] h-[30px] rounded-full' src={findUser?.image || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" />
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full items-center">
                    <h5 className="text-sm font-bold p-0 m-0">
                        {findUser?.username}
                    </h5>
                    <p className="text-[0.7rem] font-semibold text-gray-700">
                        {moment(date).fromNow()}
                    </p>
                    <div className="relative">
                        <BsThreeDotsVertical onClick={() => setOpen(!open)} cursor="pointer" size={13} />
                        {open &&
                            <Card className="flex bg-white z-20 py-1 -left-[100px] list-none flex-col gap-1 absolute px-2">
                                <li className='flex hover:bg-gray-100 p-1 px-3 cursor-pointer gap-2 items-center'><MdOutlineReport color="red" /> Report</li>

                                <li className='flex hover:bg-gray-100 p-1 px-3 cursor-pointer gap-2 items-center'><GoReply color="blue" /> Reply</li>

                                <UpdateModal comment_id={comment_id} openReply={openReply} handleClose={handleClose} setOpenReply={setOpenReply} comment={comment} />


                                {commentUser == user?._id && <li onClick={() => setOpenReply(true)} className='flex hover:bg-gray-100 p-1 px-3 cursor-pointer gap-2 items-center'>
                                    <CiEdit color="orange" />
                                    Edit
                                </li>}

                                {commentUser == user?._id && <li onClick={() => handleDeleteComment(comment_id)} className='flex hover:bg-gray-100 p-1 px-3 cursor-pointer gap-2 items-center'>
                                    <FaRegTrashAlt color="maroon" />Delete
                                </li>}


                            </Card>
                        }
                    </div>
                </div>
                <p className="text-gray-500 text-sm p-0 m-0">
                    {comment?.length > 60 ?
                        (
                            <>
                                {
                                    !readMore ? (
                                        <>
                                            {comment?.substring(0, 50)}
                                            <button onClick={() => setReadMore(true)} className="text-blue-600 text-sm">
                                                ... Show More
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {comment?.substring(0, comment?.length)}
                                            <button onClick={() => setReadMore(false)} className="text-blue-600 text-sm">
                                                Show Less
                                            </button>
                                        </>
                                    )
                                }
                            </>
                        )
                        :
                        (
                            <>
                                {comment}
                            </>
                        )
                    }
                </p>
            </div>
        </div>
    );
};

export default Comments;
