import React from 'react'
import { IoMdClock, IoMdClose } from 'react-icons/io'

const Video = ({ vidRef, stopVidRecording }) => {
    return (
        <>
            <div className="w-full flex items-center justify-center absolute backdrop-blur  min-h-screen bg-[rgba(0,0,0,0.8)]">
                <video className="rounded-xl absolute  mx-auto" width={500} height={500} ref={vidRef} playsInline autoPlay></video>
                <div className="absolute text-white top-10 right-10">
                    <IoMdClose onClick={stopVidRecording} size={40} cursor="pointer" />
                </div>
            </div>
        </>
    )
}

export default Video