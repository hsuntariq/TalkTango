import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')
const Incoming = ({ data, declineCall, link, setShowIncoming }) => {
    // const { videoLink } = useContext(AppContext)
    const [url, setUrl] = useState(null)
    useEffect(() => {
        socket.on('answered', (data) => {
            setUrl(data.shareableLink)
        })
    }, [])
    const accept = () => {
        setShowIncoming(false)
        window.open(url, '_blank');
    }
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center w-full bg-white/50 text-center z-[400] gap-7 fixed top-0">
                <div className="video-image w-max">

                    <img width="30%" className='block mx-auto' src={data?.image ? (data?.image) : (
                        "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                    )} alt="" />
                </div>
                <h1 className="text-4xl capitalize">
                    {data?.user_from} is calling...
                </h1>
                <div className="flex gap-3">
                    <button onClick={accept} className="py-2 rounded-full font-bold text-capitalize px-10 bg-green-500 text-white">
                        Accept
                    </button>
                    <button onClick={declineCall} className="py-2 rounded-full font-bold text-capitalize px-10 bg-red-500 text-white">
                        Decline
                    </button>
                </div>
            </div>
        </>
    )
}

export default Incoming