import React from 'react'
import { useSelector } from 'react-redux'

const StoryCard = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <div className="w-full relative md:w-1/2">
                <div className="relative border w-[100px] h-[200px] rounded-md">
                    <img className='object-cover' style={{ height: '100%' }} src="https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2019/05/01151040/News-Feed-no-Frame-%402x.jpg" alt="" />
                    <div className="user-image absolute top-0">
                        <img width={'60px'} style={{
                            height: '60px',
                            borderRadius: '50%'
                        }} src={user.image ? user.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />
                    </div>
                    <h6 className="text-center absolute bottom-0 text-white px-2">
                        Username
                    </h6>
                </div>
            </div >
        </>
    )
}

export default StoryCard