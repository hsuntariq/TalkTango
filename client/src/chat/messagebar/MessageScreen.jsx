import Footer from "./Footer";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from '../../services/peer'
import {
  createImageMessage,
  createMessage,
} from "../../features/chat/chatSlice";
import { toast } from "react-toastify";
import Video from "./Video";
const socket = io.connect("http://localhost:5174/");
const MessageScreen = ({ list }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { receiver_id } = useParams();
  const { chatLoading, chatData } = useSelector((state) => state.chat);
  const { user, isLoading } = useSelector((state) => state.auth);
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

        });
        setSentMessages([
          ...sentMessages,
          {
            sent: true,
            id: chatData?._id,
            sortID: Date.now(),
            voice: blob,
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
      },
    ]);

    // return the input to an empty state
    if (!chatLoading) {
      setMessage("");
    }
    dispatch(createMessage(messageData));
    // }
  };

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

  const vidRef = useRef()
  const partnerVid = useRef()
  const [vidRecording, setVidRecording] = useState(false);
  // local stream
  const [videoStream, setVideoStream] = useState(null);
  // remote stream
  const [remoteStream, setRemoteStream] = useState(null);

  const [callAccepted, setCallAccepted] = useState(false)
  const startCall = async () => {
    try {
      setVidRecording(true)
      const videoStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setVideoStream(videoStream)

      const offer = await Peer.getOffer()
      socket.emit('user:call', { to: receiver_id, offer, from: user?._id, chatID: chatData?._id })

      if (vidRef.current) {
        vidRef.current.srcObject = videoStream;
      }



    }
    catch (error) {
      setVidRecording(false)
      console.log(error)
      toast.error('Access denied')
    }
  }

  const stopVidRecording = () => {
    setVidRecording(false);
    if (vidRef.current && vidRef.current.srcObject) {
      const tracks = vidRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      vidRef.current.srcObject = null
    }
  }


  // handle incoming call

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await Peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans, from: receiver_id, chatID: chatData?._id })
    },
    [socket]
  );

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      Peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      // send the stream to the other user
      for (const track of videoStream.getTracks()) {
        Peer.peer.addTrack(track, videoStream);
      }
    },
    [videoStream]
  );


    //negotiate

  const handleNegoNeeded = useCallback(async () => {
        const offer = await Peer.getOffer()
        socket.emit('peer:nego:needed',{offer,from: receiver_id, chatID: chatData?._id})
      },[chatData?._id, receiver_id])

  const handleIncomingNego = useCallback(async({from,offer}) => {
    const ans = Peer.getAnswer(offer);
    socket.emit('peer:nego:done', { to: from, ans, chatID: chatData?._id });
  }, [chatData?._id])
  
  const handleNegoFinal = useCallback(async({ from, ans }) => {
      await Peer.setLocalDescription(ans)
  },[])
    
  
  
  useEffect(() => {
    Peer.peer.addEventListener('negotiationneeded',handleNegoNeeded )
    },[handleNegoNeeded])

  // whenever we get a track
  useEffect(() => {
    Peer.peer.addEventListener('track', async (e) => {
      const remStream = e.streams;
      setRemoteStream(remStream)
      })
  },[])

  useEffect(() => {
    socket.on("incoming:call", handleIncommingCall)
    socket.on('call:accepted', handleCallAccepted)
    socket.on('peer:nego:needed',handleIncomingNego)
    socket.on('peer:nego:final',handleNegoFinal)
  }, [handleCallAccepted, handleIncomingNego, handleIncommingCall, handleNegoFinal])





  return (
    <div className="w-full top-0 flex  flex-col relative justify-between  ">
      {vidRecording && <Video remoteStream={remoteStream} vidRef={vidRef} stopVidRecording={stopVidRecording} />}
      <MessageHeader list={list} startCall={startCall} />
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
      />
    </div>
  );
};

export default MessageScreen;
