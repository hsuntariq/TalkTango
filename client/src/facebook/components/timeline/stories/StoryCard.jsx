import React from 'react'
import { useSelector } from 'react-redux'

const StoryCard = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <div className="w-full relative md:w-1/2">
                <div className="relative border w-[100px] h-[120px] rounded-md">
                    <img className='object-cover' style={{ height: '100%' }} src="https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2019/05/01151040/News-Feed-no-Frame-%402x.jpg" alt="" />
                    <div className="user-image absolute top-0 p-2 bg-gray-600/50 rounded-full">
                        <img width={'30px'} style={{
                            height: '30px',
                            borderRadius: '50%'
                        }} src={user.image ? user.image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
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