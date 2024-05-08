import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import UploadStoryForm from './UploadStoryForm'
import { Card } from '@mui/material'
import StoryModal from './StoryModal'
const UserCard = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <div className=" w-full md:w-1/5">
                <Card className="card w-[100px] h-[120px] p-4 border rounded-2">
                    <img style={{

                    }} width={'100%'} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                    <div onClick={handleOpen} style={{
                        width: '30px',
                        height: '30px',
                        marginTop: '-10px',
                        cursor: 'pointer'
                    }} className="p-2 flex items-center z-50 justify-center bg-orange-500 relative  rounded-full mx-auto rounded-circle bg-primary d-flex justify-content-center align-items-center">


                        <FaPlus className='   text-white' cursor='pointer' style={{
                            fontWeight: 'lighter'
                        }} color='white' size={15} />
                    </div>

                </Card>
            </div>
            <StoryModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
        </>
    )
}

export default UserCard