import Footer from "./Footer"
import MessageHeader from "./MessageHeader"
import Messages from "./Messages"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import io from 'socket.io-client'
import { createImageMessage, createMessage } from "../../features/chat/chatSlice";
import { toast } from 'react-toastify'
const socket = io.connect('http://localhost:5174/');
const MessageScreen = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const { receiver_id } = useParams()
    const { chatLoading, chatData } = useSelector(state => state.chat)
    const { user, isLoading } = useSelector(state => state.auth);
    const [selectedImages, setSelectedImages] = useState([])
    const [images, setImages] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])

    const setRoom = () => {
        socket.emit('join_room', { chatID: chatData?._id })
    }

    const sendMessage = () => {
        if (!message) {
            toast.error('Messages can not be empty!')
        } else {

            const messageData = {
                sender_id: user?._id, receiver_id, message
            }
            // emit the message to the backend server
            socket.emit('sent_message', { message, chatID: chatData?._id })
            setSentMessages([...sentMessages, { message, sent: true, id: chatData?._id, sortID: Date.now() }])

            // return the input to an empty state
            if (!chatLoading) {
                setMessage('')
            }
            dispatch(createMessage(messageData))
        }

    }


    useEffect(() => {
        socket.on('received_message', (data) => {
            setReceivedMessages([...receivedMessages, { message: data, sent: false, id: chatData?._id, sortID: Date.now() }]);
        })
    }, [receivedMessages])

    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
        return a.id - b.id;
    })


    // handle multiple image upload
    const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages(Array.from(files))
        setImages(files)
    }

    const uploadImage = async () => {
        if (selectedImages && selectedImages.length > 0) {
            const promises = selectedImages.map(async (file) => {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'vgvxg0kj');

                try {
                    setImageLoading(true)
                    const res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
                        method: 'POST',
                        body: data,
                    });

                    const imageData = await res.json();
                    setImageLoading(false);
                    return imageData.url;
                } catch (error) {
                    console.log(error);
                }
            });
            try {
                const imageURLs = await Promise.all(promises)
                return imageURLs;
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleUpload = async () => {
        const images = await uploadImage();
        images?.map((image) => {
            const messageData = {
                sender_id: user?._id, receiver_id, message: image
            }
            dispatch(createMessage(messageData))
        })
    }



    const [imageInputs, setImageInputs] = useState({}); // State to keep track of inputs for each image

    // send image messages
    const handleInputChange = (name, value) => {
        setImageInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendImageChat = async () => {
        const images = await uploadImage();
        selectedImages?.forEach((img, index) => {
            const data = {
                message: imageInputs[img.name],
                sender_id: user?._id,
                receiver_id: receiver_id,
                image: images[index]
            };
            dispatch(createImageMessage(data));
        });
        setImageInputs({})
    };

    return (

        <div className='w-full sticky top-0 flex flex-col  min-h-screen '>

            <MessageHeader userInfo={userInfo} setUserInfo={setUserInfo} />
            <Messages imageInputs={imageInputs} handleInputChange={handleInputChange} setImageInputs={setImageInputs} sendImageChat={sendImageChat} imageLoading={imageLoading} handleUpload={handleUpload} selectedImages={selectedImages} setSelectedImages={setSelectedImages} userInfo={userInfo} receivedMessages={receivedMessages} allMessages={allMessages} />
            <Footer setSelectedImages={setSelectedImages} selectedImages={selectedImages} handleImageChange={handleImageChange} userInfo={userInfo} setRoom={setRoom} sendMessage={sendMessage} setMessage={setMessage} message={message} />
        </div>
    )
}

export default MessageScreen
