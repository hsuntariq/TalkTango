import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Card, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { uploadVideoData } from '../../features/video/videoSlice';
import { toast } from 'react-hot-toast'
import { CircleLoader } from 'react-spinners'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
};




export default function UploadModal({ open, setOpen, handleOpen, handleClose }) {

    const { user } = useSelector(state => state.auth)
    const { videoLoading } = useSelector(state => state.video)
    const dispatch = useDispatch()
    const [caption, setCaption] = useState('')
    const [error, setError] = useState(false)
    const [videoUploading, setVideoUploading] = useState(false);
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        if (file.type.startsWith('video')) {
            setError(false)
            setVideoPreview(url)
            setVideo(file)
        } else {
            setError(true)
        }

        setTimeout(() => {
            setError(false)
        }, 3000)
    }


    const uploadVideo = async () => {
        if (video) {

            const data = new FormData();
            data.append('file', video);
            data.append('upload_preset', 'vgvxg0kj');
            try {
                setVideoUploading(true);
                const res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/video/upload', {
                    method: 'POST',
                    body: data
                })

                const videoUrl = await res.json();
                setVideoUploading(false)
                return videoUrl.url

            } catch (error) {
                console.log(error)
            }
        }

    }


    const handleVideoUpload = async () => {
        if (video) {
            const userVideo = await uploadVideo(video);
            const data = {
                user_id: user?._id, caption, video: userVideo
            }
            dispatch(uploadVideoData(data)).then(() => {
                setOpen(false)
                setVideoPreview(null)
                toast.success('Video Uploaded Successfully', {
                    icon: '📹'
                })
                setVideo(null)
                setCaption('');
            })
        } else {
            return null;
        }
    }




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
                        Uplaod A video
                    </Typography>
                    <input accept='video/*' className='my-2' type='file' onChange={handleVideoChange} />
                    <Input className='w-full my-2' placeholder="Add a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
                    {error && <p className='text-red-500 font-bold'>
                        please choose a video
                    </p>}
                    {videoPreview && <video src={videoPreview} controls></video>}

                    <button disabled={videoLoading || videoUploading} onClick={handleVideoUpload} className="w-full p-2 rounded-full my-2 text-white font-bold bg-orange-500">
                        {videoLoading || videoUploading ? <CircleLoader size={20} /> : 'Upload'}
                    </button>

                </Card>

            </Modal>
        </div>
    );
}
