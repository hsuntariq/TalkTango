import React from 'react'
import { useSelector } from 'react-redux'
import { SyncLoader } from 'react-spinners'
import { PiVideoBold } from "react-icons/pi";

const Sidebar = () => {
    const { user, isLoading } = useSelector(state => state.auth)
    if (isLoading) {
        return <SyncLoader />
    }
    return (
        <>
            <div className="flex items-center gap-3 p-4 hover:bg-gray-200">
                <img width={'60px'} style={{
                    height: '60px',
                    borderRadius: '50%'
                }} src={user.image ? user.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />
                <h6 className='capitalize'>
                    {isLoading ? (
                        <SyncLoader />
                    ) : (
                        `${user?.username}`
                    )}
                </h6>
            </div>
            <div className="flex text-3xl flex-col gap-10 p-4">
                <div className="flex items-center hover:bg-gray-200 p-3 cursor-pointer gap-3 item-center">
                    <PiVideoBold color='' />
                    <h4>Watch</h4>
                </div>
                <div className="flex items-center hover:bg-gray-200 p-3 cursor-pointer gap-3 item-center">
                    <PiVideoBold />
                    <h4>Events</h4>
                </div>
                <div className="flex items-center hover:bg-gray-200 p-3 cursor-pointer gap-3 item-center">
                    <PiVideoBold />
                    <h4>Friends</h4>
                </div>
                <div className="flex items-center hover:bg-gray-200 p-3 cursor-pointer gap-3 item-center">
                    <PiVideoBold />
                    <h4>Memories</h4>
                </div>
                <div className="flex items-center hover:bg-gray-200 p-3 cursor-pointer gap-3 item-center">
                    <PiVideoBold />
                    <h4>Saved</h4>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Sidebar