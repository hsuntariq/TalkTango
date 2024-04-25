/* eslint-disable react/prop-types */
import { Card } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const AllPosts = ({ post, remainingPostsCount, userData, postsInGroup, numPostsToDisplay }) => {

    const { posts, postLoading, postImages, postSuccess, shared } = useSelector(state => state.post)

    if (postLoading && isLoading) {
        return <Loader />
    }

    return (
        <>


            <Card className='my-2 relative'>

                {remainingPostsCount > 0 && (
                    <div className="p-4 cursor-pointer font-bold text-3xl absolute bg-black/50 bottom-[7.5%] right-0 w-[48%] text-white flex justify-center items-center top-[59.5%] z-10 ">
                        <h3 className='flex items-center'> <FaPlus /> {remainingPostsCount}</h3>
                    </div>
                )}

                <div className="flex gap-4 items-center">
                    <div className=" p-2 rounded-full">
                        <img style={{ borderRadius: '50%' }} height={35} width={35} src={userData?.image ? userData?.image : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} />
                    </div>
                    <div className="user-data">
                        <h5 className="font-bold capitalize">{userData?.username}</h5>
                        <p className="text-gray-600 text-sm">
                            {moment(postsInGroup[0]?.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
                <h3 className="ms-8 mb-1">
                    {postsInGroup[0].caption}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {postsInGroup.slice(0, numPostsToDisplay).map((post, index) => (
                        <div key={index} className='my-2'>
                            <div className='rounded-0'>
                                <Link to={`/single-post/${post?._id}/${post?.user}`}>
                                    <img width={'100%'} className='h-[200px] object-cover' src={post?.image} alt="" />
                                </Link>
                            </div>
                            <div className="flex">
                                <p className="text-gray-600 mt-4 ms-2 text-sm font-bold">
                                    {post?.likes.length} likes
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </Card >
            );
        </>
    )
}

export default AllPosts
