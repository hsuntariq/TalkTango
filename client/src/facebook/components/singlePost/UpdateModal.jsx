import { Box, Card, Input, Modal, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdFastforward, IoMdSend } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../features/posts/postSlice'
import { useParams } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";

const UpdateModal = ({ openReply, handleClose, comment, comment_id }) => {
    const [updatedComment, setUpdatedComment] = useState(comment)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const handleUpdatedComment = (comm_id) => {
        if (!updatedComment) {
            toast.error('Please enter a value')
        } else {
            const data = {
                post_id: id, updatedComment, comment_id: comm_id
            }
            dispatch(updateComment(data))
            toast.success('Comment updated successfully', {
                icon: '✔'
            })
        }

    }


    return (
        <>
            <Modal
                open={openReply}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="min-h-screen flex justify-center items-center"
            >
                <Card className='bg-white w-1/2 p-5'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Your Comment
                    </Typography>
                    <div className="flex items-center">
                        <TextareaAutosize value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} maxRow={3} className="w-full text-sm text-gray-500 resize-none border-b-2 p-0  outline-none" id="modal-modal-description" />
                        <IoMdSend onClick={() => handleUpdatedComment(comment_id)} className='self-end text-orange-600 cursor-pointer' />
                    </div>

                </Card>
            </Modal>
        </>
    )
}

export default UpdateModal
