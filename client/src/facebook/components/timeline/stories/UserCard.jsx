import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import UploadStoryForm from './UploadStoryForm'
const UserCard = () => {
    const [open, setOpen] = useState(false)
    return (
        <>

            {open && <UploadStoryForm setOpen={setOpen} />}
            <div className=" w-full md:w-1/5">
                <div className="card w-[150px] h-[200px] p-4 border rounded-2">
                    <img style={{

                    }} width={'100%'} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                    <div onClick={() => setOpen(true)} style={{
                        width: '30px',
                        height: '30px',
                        marginTop: '-10px',
                        cursor: 'pointer'
                    }} className="p-2 mx-auto rounded-circle bg-primary d-flex justify-content-center align-items-center">
                        <FaPlus className='bg-blue-800  p-4 flex items-center justify-center text-white' cursor='pointer' style={{
                            fontWeight: 'lighter'
                        }} color='white' size={15} />
                    </div>
                    <h5 className="text-center">
                        Create a story
                    </h5>
                </div>
            </div>
        </>
    )
}

export default UserCard