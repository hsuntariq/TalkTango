import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
// import { ClipLoader } from 'react-loading-spinner'
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

export default function ProfilePicModal({ open, setOpen, handleOpen, handleClose }) {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // handle the image input field change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        setImage(file);
    }

    // upload the image to the cloudinary server
    const uploadImage = async () => {
        if (image) {

            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'vgvxg0kj');
            try {
                setImageUploaded(true);
                const res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
                    method: 'POST',
                    body: data
                })

                const imageUrl = await res.json();
                setImageUploaded(false)
                return imageUrl.url

            } catch (error) {
                console.log(error)
            }
        }

    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Card sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Upload Profile Photo
                        </Typography>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && <img className='my-3 h-[200px] w-[100%] object-contain block mx-auto' src={imagePreview} />}
                        <Button onClick={uploadImage} style={{ background: 'linear-gradient(to right, #FEBA00,#FD6700)', color: 'white', fontWeight: 'bold', width: '100%', margin: '1rem 0' }} variant="contained" size="small" >
                            Upload
                        </Button>
                    </Card>
                </Fade>
            </Modal>
        </div>
    );
}
