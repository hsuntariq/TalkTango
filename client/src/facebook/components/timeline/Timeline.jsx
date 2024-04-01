import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux'
import { Container, FormControl, Input } from '@mui/material';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import Story from './stories/Story';
import Posts from './posts/Posts';
import { postData, postImage, reset } from '../../../features/posts/postSlice';
import Skeleton from 'react-loading-skeleton';

const Timeline = () => {
     const [images, setImages] = useState([]);
    const [load, setLoad] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageLoading, setImageLoading] = useState(false)
    const { user } = useSelector(state => state.auth);
    const { postLoading, postSuccess } = useSelector(state => state.post)
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (postSuccess) {
            setImagePreviews([])
        }
        dispatch(reset())
    }, [postSuccess])


    const postCaption = (e) => {
        e.preventDefault();
        const data = {
            user_id: user?._id, caption: caption
        }

        dispatch(postData(data))
        if (!postLoading) {
            setCaption('')
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files;
        const files = Array.from(file);
        setImagePreviews(files);
    }

    // username:dyxoufsb0
    // preset: xola95pc


    const uploadMultipleImages = async () => {

        const promises = imagePreviews.map(async (img) => {
            try {

                setLoad(true)
                const data = new FormData();
                data.append('file', img);
                data.append('upload_preset', 'xola95pc');
                const res = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                    method: "POST",
                    body: data
                })

                const imageData = await res.json();
                setLoad(false)
                return imageData.url;
            }
            catch (error) {
                console.log(error)
            }
        })

        try {
            const imageURls = await Promise.all(promises);
            return imageURls
        } catch (error) {
            console.log(error)
        }


    }



    const handleClick = async () => {

        const URLs = await uploadMultipleImages(imagePreviews)

        URLs.map((img) => {
            const postData = {
                caption, image: img, user: user?._id
            }
            dispatch(postImage(postData))
        })


    }

    if (postLoading && load) {
        return <>
            <Skeleton height={20} width={200} />
            <Skeleton width={30} height={20} />
        </>
    }



    return (
        <>
            <div className='w-3/4 mx-auto relative top-20'>

            <Card variant='outlined' className='px-5 py-4 my-3 shadow'>
                <div className='flex items-center gap-4'>
                    <img width={'40px'} style={{
                        height: '40px',
                        borderRadius: '50%'
                    }} src={user.image ? user.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />

                    <FormControl className='w-full d-flex align-items-center'>
                        <Input value={caption} onChange={(e) => setCaption(e.target.value)} type='text' className='w-full rounded-full outline-none' placeholder={`What's on your mind ${user?.username}?`} />
                    </FormControl>
                </div>
                <hr className='my-2' />
                <div className="flex justify-between text-1xl  items-center">
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
                        <Posts caption={caption} images={images} />
            </div>


        </>
    )
}

export default Timeline