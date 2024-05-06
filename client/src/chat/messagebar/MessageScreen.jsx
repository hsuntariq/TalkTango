import Footer from "./Footer";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from '../../services/peer'
import {
  createImageMessage,
  createMessage,
} from "../../features/chat/chatSlice";
import { toast } from "react-toastify";
import Incoming from "./Incoming";
import { AppContext } from "../../context/Context";
const socket = io.connect("http://localhost:5174/");
const MessageScreen = ({ list, link }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { receiver_id } = useParams();
  const { chatLoading, chatData } = useSelector((state) => state.chat);
  const { user, isLoading, allUsers } = useSelector((state) => state.auth);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle audio input
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);





  // start recording
  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);
      setStream(audioStream);
      const recorder = new MediaRecorder(audioStream);
      setMediaRecorder(recorder);
      const chunks = [];
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        socket.emit("sent_message", {
          chatID: chatData?._id,
          voice: blob,
          sender_id: user?._id,
          receiver_id
        });
        setSentMessages([
          ...sentMessages,
          {
            sent: true,
            id: chatData?._id,
            sortID: Date.now(),
            voice: blob,
            sender_id: user?._id,
            receiver_id
          },
        ]);
      };
      recorder.start();
    } catch (error) {
      toast.error('Please enable microphone to access this feature');
    }
  };

  // stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setAudioBlob(null)
      setRecording(false);
      setStream(null);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, navigate, dispatch]);

  const setRoom = () => {
    socket.emit("join_room", { chatID: chatData?._id });
  };

  const sendMessage = () => {
    // if (!message) {
    //   toast.error("Messages can not be empty!");
    // } else {
    const messageData = {
      sender_id: user?._id,
      receiver_id,
      message,
    };
    // emit the message to the backend server
    socket.emit("sent_message", { message, chatID: chatData?._id });
    setSentMessages([
      ...sentMessages,
      {
        message,
        sent: true,
        id: chatData?._id,
        sortID: Date.now(),
        sender_id: user?._id,
        receiver_id
      },
    ]);
    socket.emit("sent_message", { message, chatID: chatData?._id });
    setSentMessages([
      ...sentMessages,
      {
        message,
        sent: true,
        id: chatData?._id,
        sortID: Date.now(),
        sender_id: user?._id,
        receiver_id
      },
    ]);

    // return the input to an empty state
    if (!chatLoading) {
      setMessage("");
    }
    dispatch(createMessage(messageData));
    // }
  };


  const buy = async (data) => {
    socket.emit("sent_message", { payment: data.price, chatID: chatData?._id });
    setSentMessages([
      ...sentMessages,
      {
        payment: data.price,
        sent: true,
        id: chatData?._id,
        sortID: Date.now(),
        sender_id: user?._id,
        receiver_id
      },
    ]);
    const response = await fetch('http://localhost:5174/api/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: data })
    })

    const d = await response.json()
    window.open(d.url, '_blank')
    // console.log(d)

  }

  useEffect(() => {
    socket.on("received_message", (data) => {
      setReceivedMessages([
        ...receivedMessages,
        {
          message: data?.message,
          image: data?.image,
          sent: false,
          id: chatData?._id,
          sortID: Date.now(),
          voice: data?.voice,
          sender_id: user?._id,
          receiver_id,
          payment: data.payment
        },
      ]);
    });
  }, [receivedMessages]);

  const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
    return a.id - b.id;
  });

  // handle multiple image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(Array.from(files));
    setImages(files);
  };

  const uploadImage = async () => {
    if (selectedImages && selectedImages.length > 0) {
      const promises = selectedImages.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "vgvxg0kj");

        try {
          setImageLoading(true);
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const imageData = await res.json();
          setImageLoading(false);
          return imageData.url;
        } catch (error) {
          console.log(error);
        }
      });
      try {
        const imageURLs = await Promise.all(promises);
        return imageURLs;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpload = async () => {
    const images = await uploadImage();
    images?.map((image) => {
      const messageData = {
        sender_id: user?._id,
        receiver_id,
        message: image,
      };
      dispatch(createMessage(messageData));
    });
  };

  const [imageInputs, setImageInputs] = useState({}); // State to keep track of inputs for each image

  // send image messages
  const handleInputChange = (name, value) => {
    setImageInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendImageChat = async () => {
    const images = await uploadImage();
    selectedImages?.forEach((img, index) => {
      // socket messages
      // emit the message to the backend server
      socket.emit("sent_message", {
        message,
        chatID: chatData?._id,
        image: images[index],
      });
      setSentMessages([
        ...sentMessages,
        {
          message: imageInputs[img.name],
          sent: true,
          id: chatData?._id,
          sortID: Date.now(),
          image: images[index],
        },
      ]);

      const data = {
        message: imageInputs[img.name],
        sender_id: user?._id,
        receiver_id: receiver_id,
        image: images[index],
      };
      dispatch(createImageMessage(data));
    });
    setImageInputs({});
  };


  // handle video call




  const [showIncoming, setShowIncoming] = useState(false)
  const [myData, setMyData] = useState(null)
  useEffect(() => {
    socket.on('alert', (data) => {
      if (user?._id == data.to) {
        setShowIncoming(true)
        setMyData(data)
      }
    })
  })
  useEffect(() => {
    socket.on('declined', (data) => {
      console.log(user?._id == data.to)
      if (user?._id == data.to) {
        alert(`${data?.user_from.toUpperCase()} has declined the call`)
      }
    })
  })


  const findUser = () => {
    return allUsers.find((item) => {
      return item._id == receiver_id;
    })
  }

  const declineCall = () => {
    setShowIncoming(false);
    setMyData(false)

    socket.emit('call_declined', { from: user?._id, to: receiver_id, user_from: user?.username })

  }




  return (
    <>
      {showIncoming && <Incoming showIncoming={showIncoming} setShowIncoming={setShowIncoming} link={link} declineCall={declineCall} data={myData} />}

      <div className="w-full top-0 flex  flex-col relative justify-between  ">
        <MessageHeader list={list} />
        <Messages
          audioBlob={audioBlob}
          imageInputs={imageInputs}
          handleInputChange={handleInputChange}
          setImageInputs={setImageInputs}
          sendImageChat={sendImageChat}
          imageLoading={imageLoading}
          handleUpload={handleUpload}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          receivedMessages={receivedMessages}
          allMessages={allMessages}
        />
        <Footer
          sentMessages={sentMessages}
          setSentMessages={setSentMessages}
          stopRecording={stopRecording}
          startRecording={startRecording}
          recording={recording}
          setSelectedImages={setSelectedImages}
          selectedImages={selectedImages}
          handleImageChange={handleImageChange}
          setRoom={setRoom}
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
          audioBlob={audioBlob}
          buy={buy}
        />
      </div>
    </>
  );
};

export default MessageScreen;
