import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockModal from './LockModal';
import ScheduleModal from './ScheduleModal';

export default function ChatPopUp({ anchorEl, setAnchorEl, handleClick, handleClose, open, id }) {


    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);

    return (
        <div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 1 }}>
                    <h5 onClick={handleOpen2} className="p-2 cursor-pointer hover:bg-gray-100 font-bold text-sm">
                        Chat Lock
                    </h5>
                    <h5 onClick={handleOpen3} className="p-2 w-max cursor-pointer hover:bg-gray-100 font-bold text-sm">
                        Schedule Message
                    </h5>
                </Typography>
            </Popover>
            <LockModal open2={open2} setOpen2={setOpen2} handleOpen2={handleOpen2} handleClose2={handleClose2} />
            <ScheduleModal open3={open3} setOpen3={setOpen3} handleOpen3={handleOpen3} handleClose3={handleClose3} />
        </div>
    );
}
