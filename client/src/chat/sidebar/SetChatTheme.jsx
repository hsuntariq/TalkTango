import { useState } from "react"
import { IoArrowBack, } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { BiImageAdd } from "react-icons/bi";
import { BarLoader } from "react-spinners";
import { setChatTheme } from "../../features/auth/authSlice";

const SetChatTheme = ({ setChatOpen, chatOpen }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true')
    const [imageUploaded, setImageUploaded] = useState(false);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const imageUpload = async (e) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'vgvxg0kj');
        try {
            setImageUploaded(true)
            const imageData = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
                method: "POST",
                body: data
            })
            const imageUrl = await imageData.json();
            setImageUploaded(false);
            return imageUrl.url;
        } catch (error) {
            console.log(error)
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        setImage(file);
    }

    const handleChatThemeChange = async () => {
        const chatImg = await imageUpload(image)
        const themeData = {
            id: user?._id, chatBG: user?.chatBG, chatImage: chatImg
        }
        dispatch(setChatTheme(themeData))
    }

    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,
            }} className={`transition-[1s] w-full min-h-screen z-50 absolute top-0 ${chatOpen || 'translate-y-[100%]'}`}>

                <div className="flex font-normal px-4 py-3 text-2xl gap-4 text-white mt-auto items-end h-full">
                    <IoArrowBack onClick={() => setChatOpen(false)} size={30} color='white' cursor="pointer" />
                    <h1>Chat Image</h1>
                </div>
                <h3 className="text-2xl fw-bold text-center">
                    Set An Image
                </h3>
                <div className="w-[300px] h-[300px]  mx-auto  my-4 border">
                    <img src={imagePreview} className="w-full h-full object-cover aspect-square" alt="" />
                </div>
                <div className="icon relative cursor-pointer">
                    <BiImageAdd size={40} className="absolute rounded-full bg-black p-3 left-[5%] bottom-[20%]  cursor-pointer" />
                    <input className="opacity-0 absolute bottom-4 cursor-pointer z-50" onChange={handleImageChange} type="file" id="" />
                </div>
                <button onClick={handleChatThemeChange} className="w-1/2 p-1 rounded-full mx-auto block bg-blue-400">
                    {imageUploaded ? <div className='flex flex-col justify-center items-center gap-2 '>
                        <p>Updating...</p>
                        <BarLoader
                            color="white"
                            loading={imageUploaded}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"

                        /></div> : 'Change Chat Image'}
                </button>
            </div>
        </>
    )
}

export default SetChatTheme
