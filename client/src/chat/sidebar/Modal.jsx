import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPass, reset } from '../../features/chat/chatSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

// eslint-disable-next-line react/prop-types
const BasicModal = ({ onClose, receiver_id }) => {
    const { user } = useSelector(state => state.auth);
    const { chatError, chatSuccess, message, chatLoading } = useSelector(state => state.chat);
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (chatError) {
            toast.error(message)
        }



    }, [chatError, chatSuccess, dispatch, message, navigate, onClose, receiver_id])

    const handlePassword = () => {
        const data = {
            sender_id: user?._id, receiver_id, password: pass
        }

        dispatch(checkPass(data)).then(() => {
            onClose()
            navigate(`/message-panel/${receiver_id}`)
            toast.success('Verification successful')
            dispatch(reset())
        })

    }

    return (
        <div>
            <Modal
                open={true} // Ensure the modal is open by default
                onClose={onClose} // Handle closing the modal when clicking outside or pressing Esc
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter password to Access
                    </Typography>
                    <Input className="w-full" type='password' placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <Button onClick={handlePassword} color="primary" sx={{ backgroundColor: 'orange', color: 'black', width: '100%', margin: '1rem 0', fontWeight: 'bold' }}>
                        {chatLoading ? 'Accessing...' : 'Access'}
                    </Button>
                </Box>
            </Modal>
        </div >
    );
}

export default BasicModal;
