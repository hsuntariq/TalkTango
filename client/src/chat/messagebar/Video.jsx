import React from 'react'
import { IoMdClock, IoMdClose } from 'react-icons/io'
import ReactPlayer from 'react-player'
const Video = ({ vidRef, stopVidRecording, remoteStream }) => {
    return (
        <>
            <div className="w-full flex items-center justify-center absolute backdrop-blur  min-h-screen bg-[rgba(0,0,0,0.8)]">
                <h1 className='text-white text-5xl'>Local stream</h1>
                <video
                    className="rounded-xl absolute  mx-auto"
                    width={500}
                    height={500}
                    ref={vidRef}
                    playsInline
                    autoPlay></video>
                {remoteStream
                    &&
                    <>
                    <h4 className="text-white text-5xl">
                        Remote Stream
                    </h4>
                    <ReactPlayer
                        className="rounded-xl absolute  mx-auto"
                        width={500}
                        height={500}
                        url={remoteStream}
                        playsInline
                        autoPlay />
                            </>
                        }

                <div className="absolute text-white top-10 right-10">
                    <IoMdClose onClick={stopVidRecording} size={40} cursor="pointer" />
                </div>
            </div>
        </>
    )
}

export default Video