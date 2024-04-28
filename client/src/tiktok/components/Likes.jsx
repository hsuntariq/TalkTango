/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
};

export default function Likes({ open, setOpen, handleOpen, handleClose, likes }) {


    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Card sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Likes
                    </Typography>
                    {likes?.map((like) => {
                        return (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3">

                                        <img src={like?.image} className='w-[50px] h-[50px] rounded-full' alt="" />
                                        <div className="flex flex-col">
                                            <h4 className="font-bold capitalize">
                                                {like?.username}
                                            </h4>
                                            <div className="text-blue-500">
                                                {like?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="contained" color="primary" size="small" >
                                        See More
                                    </Button>
                                </div>
                            </>
                        )
                    })}
                </Card>
            </Modal>
        </div>
    );
}
