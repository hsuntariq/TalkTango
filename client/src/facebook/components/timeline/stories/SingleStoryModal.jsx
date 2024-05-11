/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SingleStoryModal({ content, caption, findUser, handleOpen, handleClose, open, setOpen }) {


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <img className='w-full h-full' src={content} alt="" />
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <span className='capitalize'>{findUser?.username}</span>:{caption}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
