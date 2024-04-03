import { Box, Card, Input, Modal, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdSend } from 'react-icons/io'

const ReplyModal = ({ openReply, handleClose, comment }) => {
    const [updatedComment, setUpdatedComment] = useState(comment)
    const [show, setShow] = useState(false)

    const handleUpdatedComment = () => {
        if (!updatedComment) {
            toast.error('Please enter a value')
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
                        <IoMdSend onClick={handleUpdatedComment} className='self-end text-orange-600 cursor-pointer' />
                    </div>

                </Card>
            </Modal>
        </>
    )
}

export default ReplyModal
