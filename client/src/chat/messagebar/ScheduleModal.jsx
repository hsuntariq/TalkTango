import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chatLock, scheduleMessageData } from '../../features/chat/chatSlice';
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ScheduleModal({ open3, setOpen3, handleOpen3, handleClose3 }) {
    const { user } = useSelector(state => state.auth);
    const { chatData, chatLoading } = useSelector(state => state.chat);
    const { receiver_id } = useParams()
    const dispatch = useDispatch()
    const [date, setDate] = useState(null)
    const [message, setMessage] = useState('')
    const handleClick = (e) => {
        e.preventDefault();
        // console.log(date, message)
        dispatch(scheduleMessageData({
            sender_id: user?._id, receiver_id, message, date
        }))

        // setOpen3(false)
    }






    return (
        <div>
            <Modal
                keepMounted
                open={open3}
                onClose={handleClose3}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Schedule Message
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <FormControl fullWidth>

                            <TextField
                                id="outlined-helperText"
                                label="Write a message..."
                                sx={{ marginBottom: '0.6rem ' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <TextField
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                type="datetime-local"
                            />

                            <Button onClick={handleClick} fullWidth variant="contained" className='my-2' sx={{ backgroundColor: 'orange', margin: '1rem 0' }}>
                                {chatLoading ? 'Scheduling...' : 'Schedule'}
                            </Button>


                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
