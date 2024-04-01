import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux'
import { FormControl, Input } from '@mui/material';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import Story from './stories/Story';

const Timeline = () => {
    const { user } = useSelector(state => state.auth)
    const [caption, setCaption] = useState('')


    return (
        <>
            <Card variant='outlined' className='p-5 shadow'>
                <div className='flex items-center gap-4'>
                    <img width={'60px'} style={{
                        height: '60px',
                        borderRadius: '50%'
                    }} src={user.image ? user.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />

                    <FormControl className='w-full d-flex align-items-center'>
                        <Input value={caption} onChange={(e) => setCaption(e.target.value)} type='text' className='w-full rounded-full outline-none p-3' placeholder={`What's on your mind ${user?.username}?`} />
                    </FormControl>
                </div>
                <hr className='my-2' />
                <div className="flex justify-between text-2xl items-center">
                    <div className="flex cursor-pointer gap-4 items-center">
                        <BsFillMegaphoneFill />
                        <h4>Photo/Video</h4>
                    </div>
                    <div className="flex cursor-pointer gap-4 items-center">
                        <BsFillMegaphoneFill />
                        <h4>Photo/Video</h4>
                    </div>
                    <div className="flex cursor-pointer gap-4 items-center">
                        <BsFillMegaphoneFill />
                        <h4>Photo/Video</h4>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Timeline