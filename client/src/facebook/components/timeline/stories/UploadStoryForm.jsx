import React, { useEffect, useState } from 'react'
// import { GrGallery } from "react-icons/gr";
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
// import { addStory } from '../../../features/stories/storySlice';
import Skeleton from 'react-loading-skeleton'
import { FormControl, Input, Button, Container } from '@mui/material'
const UploadStoryForm = ({ setOpen }) => {
    const [imageUploaded, setImageUploaded] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [test] = useState(true)
    const [caption, setCaption] = useState('')
    const { user } = useSelector(state => state.auth)
    // const { storyLoading, storySuccess, storyError, storyMessage, stories } = useSelector(state => state.story)
    const dispatch = useDispatch()
    // username : dyxoufsb0
    // upload_preset: xola95pc

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file);
        setImagePreview(url)
        setImage(file)
    }

    const handleUpload = async (e) => {
        // steps to send the file to the cloudinary
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'xola95pc');
        try {
            setImageUploaded(true)
            const res = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                method: 'POST',
                body: data
            });

            const imageURL = await res.json();
            setImageUploaded(false);
            setImagePreview(null)
            return imageURL.url

        } catch (error) {
            console.log(error)
        }
    }

    const handleStoryUpload = async () => {
        // id not image and caption are added
        if (!image && !caption) {
            toast.error('Please add caption or an image')
        } else if (image && !caption) {
            // if image is added,but caption is not
            const imageURL = await handleUpload(image);
            const data = {
                user_id: user?._id, image: imageURL.url, caption: null
            }
            // dispatch(addStory(data))
        } else if (!image && caption) {
            // if iamge is not added but caption is
            const data = {
                user_id: user?._id, image: null, caption
            }
            // dispatch(addStory(data))
        } else {
            // if image and caption are present
            const imageURL = await handleUpload(image);
            const data = {
                user_id: user?._id, image: imageURL.url, caption
            }
            // dispatch(addStory(data))
        }
    }

    if (imageUploaded) {
        return (
            <>
                <Container className='flex w-full items-center justify-center' style={{
                    height: '100vh',
                    width: '100vw',
                    background: 'rgba(255, 255, 255, 0.7)',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: '999'
                }}>
                    <Skeleton style={{
                        transform: 'translateX(-20%)'
                    }} height={300} width="600px" />

                </Container>
            </>
        )
    }


    return (
        <>
            <Container className='flex items-center justify-center' style={{
                height: '100vh',
                width: '100vw',
                background: 'rgba(255, 255, 255, 0.7)',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: '999'
            }}>

                <FormControl className='shadow w-3/4 md:w-1/2 rounded-3 p-5 bg-white position-relative'>
                    <IoMdClose onClick={() => setOpen(false)} size={40} cursor="pointer" className='position-absolute' style={{
                        right: '0px',
                        top: '0'
                    }} />
                    <img width={50} height={50} style={{
                        borderRadius: '50%',
                        left: '-20px',
                        top: '-20px'
                    }} className='position-absolute' src={
                        user?.image ? user?.image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    } alt="" />
                    <div className="d-flex gap-4 align-items-center position-absolute" style={{

                    }}>
                        {/* <GrGallery size={40} /> */}
                        <h5>Upload Story</h5>
                    </div>
                    <Input onChange={handleImageChange} type='file' style={{
                        opacity: '0'
                    }} className='my-2' />
                    {
                        imagePreview && <img width={'100%'} src={imagePreview} alt="" />
                    }
                    <Input value={caption} onChange={(e) => setCaption(e.target.value)} type='text' placeholder='Enter a caption...' className='my-2' />
                    <Button disabled={imageUploaded} onClick={handleStoryUpload} variant="primary" className='my-2 w-100'>Upload Story</Button>
                </FormControl>

            </Container>
        </>
    )
}

export default UploadStoryForm