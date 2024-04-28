/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa6";
import { PiClockBold } from "react-icons/pi";
import { getChat } from "../../features/chat/chatSlice";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import ring from '../../assets/ringtone.mp3'
const Messages = ({
  allMessages,
  handleInputChange,
  imageInputs,
  sendImageChat,
  imageMsg,
  setImageMsg,
  handleUpload,
  userInfo,
  selectedImages,
  setSelectedImages,
  imageLoading,
  audioChunks,
  audioBlob
}) => {


  const messagesEndRef = useRef(null);
  const [showImage, setShowImage] = useState(null);
  const { user, isLoading } = useSelector((state) => state.auth);
  const { chatData, chatLoading } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { receiver_id } = useParams();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, navigate, dispatch]);

  const findChat = () => {
    const foundChat = allMessages.filter((chat) => {
      return chat.sender_id == user?._id && chat.receiver_id == receiver_id;
    });

    const sortedChat = foundChat.sort((a, b) => a.sortID - b.sortID);


    return sortedChat;
  };


  useEffect(() => {
    const chatData = {
      sender_id: user?._id, receiver_id
    }
    dispatch(getChat(chatData))
  }, [receiver_id])

  useEffect(() => {
    findChat();
  }, [userInfo?.username]);

  const handleSelectedImage = (name) => {
    const image = selectedImages.find((img, index) => {
      return img.name === name;
    });
    setShowImage(image);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(${user?.chatBG},0.6),rgba(${user?.chatBG
            },0.3)), url('${user?.chatImage
              ? user?.chatImage
              : "https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true"
            }')`,
          backgroundSize: `${user.chatImage == 'https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true' ? 'contain' : 'cover'}`
        }}
        className={`h-[90%] bg-center `}
      >
        <div className="messages overflow-y-scroll py-10  h-[85vh]">
          {/* {chatData?.chat?.map((message) => {
            return (
              <>
                <p className='relative'>
                  {message?.sender_id == user?._id ? (
                    <div className="w-max px-5 mx-3 py-1 my-2 rounded-md text-white text-1xl ms-auto max-w-[400px] break-all bg-green-600">
                      {message?.image && (
                        <div className='relative'>
                          <img
                            width={"200px"}
                            height={"200px"}
                            className="aspect-square object-cover"
                            src={message.image}
                          />
                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                            {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                          </div>
                        </div>

                      )}
                      {message?.voice && (
                        <div className='relative'>
                          <audio controls>
                            <source src={URL.createObjectURL(new Blob([message.voice]))} />
                            Your browser does not support the audio element.
                          </audio>
                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                            {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                          </div>
                        </div>
                      )}
                      <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                        {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                      </div>
                      {message.message}
                    </div>
                  ) : (
                    <div className="w-max px-5 relative mx-3 py-1 my-2 rounded-md text-white text-1xl bg-gray-400">
                      {message?.image && (
                        <div className='relative'>
                          <img
                            width={"200px"}
                            height={"200px"}
                            className="aspect-square object-cover"
                            src={message.image}
                          />
                          <div className="text-end flex justify-end absolute right-1 bottom-1 flex-end">
                          </div>

                        </div>
                      )}
                      <div className="text-end flex justify-end absolute right-1 bottom-1 flex-end">
                      </div>
                      {message?.voice && (
                        <div className='relative'>
                          {message?.voice && <audio controls>
                            <source src={URL.createObjectURL(new Blob([message.voice]))} />

                          </audio>}
                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                          </div>
                        </div>
                      )}
                      {message.message}
                    </div>
                  )}
                </p>
              </>
            );
          })} */}
          {findChat()?.map((message) => {
            return (
              <>
                <p className='relative'>
                  {message.sent ? (
                    <div className="w-max px-5 mx-3 py-1 my-2 rounded-md text-white text-1xl ms-auto max-w-[400px] break-all bg-green-600">
                      {message?.image && (
                        <div className='relative'>
                          <img
                            width={"200px"}
                            height={"200px"}
                            className="aspect-square object-cover"
                            src={message.image}
                          />
                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                            {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                          </div>
                        </div>

                      )}
                      {message?.voice && (
                        <div className='relative'>
                          <AudioPlayer
                            controls
                            src={URL.createObjectURL(new Blob([message?.voice]))}
                          />

                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                            {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                          </div>
                        </div>
                      )}
                      <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                        {chatLoading ? (<PiClockBold size={12} color="gray" />) : (<FaCheck size={12} color="lightgray" />)}
                      </div>
                      {message.message}
                    </div>
                  ) : (
                    <div className="w-max px-5 relative mx-3 py-1 my-2 rounded-md text-white text-1xl bg-gray-400">
                      {message?.image && (
                        <div className='relative'>
                          <img
                            width={"200px"}
                            height={"200px"}
                            className="aspect-square object-cover"
                            src={message.image}
                          />
                          <div className="text-end flex justify-end absolute right-1 bottom-1 flex-end">
                          </div>

                        </div>
                      )}
                      <div className="text-end flex justify-end absolute right-1 bottom-1 flex-end">
                      </div>
                      {message?.voice && (
                        <div className='relative'>
                          {message?.voice && <AudioPlayer
                            autoPlay={false}
                            controls={true}
                            src={URL.createObjectURL(new Blob([message?.voice]))}
                          />}
                          <div className="text-end flex justify-end absolute right-4 bottom-1 flex-end">
                          </div>
                        </div>
                      )}
                      {message.message}
                    </div>
                  )}
                </p>
              </>
            );
          })}

          <div ref={messagesEndRef} />

          {selectedImages.length > 0 && (
            <div className="image-panel bg-gray-900 min-h-screen flex flex-col items-center absolute top-10 w-full justify-start ">
              <IoCloseSharp
                color="white"
                size={40}
                className="ms-auto"
                cursor="pointer"
                onClick={() => setSelectedImages([])}
              />
              {isLoading ? (
                <ClipLoader size={50} />
              ) : (
                <div className="container w-3/4  mx-auto">
                  <div className="w-full aspect-video overflow-hidden my-10 flex   flex-col justify-center items-center">
                    {showImage && (
                      <img
                        width={"100%"}
                        height={"400px"}
                        className="object-contain "
                        src={URL.createObjectURL(showImage)}
                        alt=""
                      />
                    )}
                  </div>

                  <form className="rounded-md py-1 flex item-center bg-white px-5 w-full">
                    <input
                      value={imageInputs[showImage?.name] || ""} // Use corresponding input value for the shown image
                      onChange={(e) =>
                        handleInputChange(showImage?.name, e.target.value)
                      } // Pass image name to handleInputChange
                      type="text"
                      className="rounded-md bg-transparent py-1 px-5 w-full border-0 focus:border-0 focus:outline-0"
                      placeholder="Write something...."
                    />
                    <span className="self-center">
                      {imageLoading ? (
                        <ClipLoader />
                      ) : (
                        <IoSend
                          onClick={() => {
                            // handleUpload();
                            sendImageChat();
                          }}
                          cursor="pointer"
                        />
                      )}
                    </span>
                  </form>
                  <div className="flex images w-full mx-auto gap-4 ">
                    {selectedImages?.map((file, index) => {
                      return (
                        <>
                          <div className="flex gap-3">
                            <img
                              onClick={() => handleSelectedImage(file.name)}
                              className="w-[80px]  my-10 mx-auto  aspect-square border cursor-pointer"
                              key={index}
                              src={URL.createObjectURL(file)}
                              alt=""
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
