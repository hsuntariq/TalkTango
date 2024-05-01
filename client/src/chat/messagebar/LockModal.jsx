import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chatLock } from '../../features/chat/chatSlice';
import { toast } from 'react-hot-toast'
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

export default function LockModal({ open2, setOpen2, handleOpen2, handleClose2 }) {
    const { user } = useSelector(state => state.auth);
    const { chatData, chatLoading } = useSelector(state => state.chat);
    const [lock, setLock] = useState('');
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault();
        const data = {
            chat_id: chatData?._id, user_id: user?._id, lock, pass
        }
        dispatch(chatLock(data)).then(() => {
            toast.success('Chat Locked Successfully!')
        }).catch(error => {
            toast.error('An Error Occured')
        })

        setPass('')
        setLock('')
        setOpen2(false)
    }




    return (
        <div>
            <Modal
                keepMounted
                open={open2}
                onClose={handleClose2}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Chat Lock
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">LockStatus</InputLabel>
                            <Select value={lock} onChange={(e) => setLock(e.target.value)} label="Lock status">
                                <MenuItem value="true">Lock</MenuItem>
                                <MenuItem value="false">Unlock</MenuItem>
                            </Select>
                            <Input disabled={lock == 'false'} value={pass} type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                            <Button onClick={handleClick} disabled={chatLoading} fullWidth variant="contained" className='my-2' sx={{ backgroundColor: 'orange', margin: '1rem 0' }}>
                                {chatLoading ? 'Locking...' : 'Lock Chat'}
                            </Button>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
