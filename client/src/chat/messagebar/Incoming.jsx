import React from 'react'

const Incoming = ({ data, declineCall }) => {
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
                    <button className="py-2 rounded-full font-bold text-capitalize px-10 bg-green-500 text-white">
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