import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../timeline/posts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostData } from '../../../features/posts/postSlice'
import { Card, Container, FormControl } from '@mui/material'
import Likes from './Likes'
import moment from 'moment'
const SinglePost = () => {
    const { id,user_id } = useParams()
    const { allUsers } = useSelector(state => state.auth)
    const { posts, postLoading } = useSelector(state => state.post)
    const [open, setOpen] = useState(false)

    const findUser = () => {
        const user = allUsers.find((person) => {
            return person._id === user_id
        })

        return user
    }


    return (
        <>
            <div className="underlay -z-40  transition-all w-full absolute top-0 md:min-h-[80%] min-h-[50%]" style={{
        clipPath: "polygon(0 0, 100% 0, 100% 42%, 0% 100%)",
          background: 'linear-gradient(45deg,orange,#ff333d,#FFA500,hotpink)',
          animation: 'moveGradient 9s infinite alternate-reverse',
          backgroundSize:'400% 400%'
      }}></div>
            <div className="w-3/4 min-h-screen flex justify-center items-center mx-auto">
                {posts?.map((post) => {
                    const likes = post?.likes?.map((like) => {
                        const users = allUsers.find((user) => {
                            return user?._id === like
                        })
                        return users
                    })



                    if (post?._id === id) {
                        return (

                            <>
                                <Container className='rounded-xl shadow-xl'>
                                    <div className="flex gap-4 shadow p-5">
                                    
                                            <div className="w-[70%]">
                                            <Card>
                                                
                                        <img className='w-full h-[400px] object-contain' src={post?.image} />
                                        </Card>
                                        </div>
                                        <div className="flex self-start flex-col gap-4">
                                            <div className="flex gap-4">
                                                <img className='w-[50px] h-[50px] rounded-full' src= {findUser()?.image ? (findUser?.image) : ("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")} alt="" />
                                                <div className="flex flex-col">
                                                    <h4 className='font-bold capitalize'>
                                                    {findUser()?.username}
                                                </h4>
                                                <p className="text-sm font-bold text-gray-500">
                                                    {moment(post?.createdAt).fromNow()}
                                                </p>
                                                </div>
                                            </div>
                                            <hr />
                                          <input type='text' className='mt-auto'  />

                                        </div>
                                    
                                               
                                    </div>
                                </Container>
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default SinglePost