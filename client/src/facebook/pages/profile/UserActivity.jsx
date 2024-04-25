import { Card, CardHeader, TextField } from '@mui/material'
import React from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const UserActivity = () => {
    const { user } = useSelector(state => state.auth)
    const { id } = useParams()
    return (
        <>
            <div className="flex flex-col md:flex-row my-4 p-3 justify-between gap-10">
                <div className="flex flex-col gap-4 self-start">
                    <Card className='p-4'>
                        <h4 className="font-bold uppercase">
                            Friends
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3">
                            <img className='w-[150px] h-[150px] m-3 object-cover ' src={user?.image ? user?.image : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577'} alt="" />


                        </div>
                    </Card>
                </div>


                {/* user activity */}
                <div className="flex flex-col w-full md:w-1/2 self-start p-3">

                    <Card className='my-3'>
                        <div className='flex gap-4 bg-gray-100 p-4'>
                            <h3 className="font-bold uppercase">
                                post
                            </h3>

                        </div>
                        <input type="text" className='w-full outline-0 p-4' placeholder='Write something...' />
                    </Card>

                    <Card>
                        <div className="flex gap-3 items-center">
                            <img className='w-[50px] h-[50px] m-3 object-cover ' src={user?.image ? user?.image : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577'} alt="" />
                            <div className="flex flex-col">

                                <h5 className="font-bold capitalize">
                                    Ali
                                </h5>
                                <h5 className="font-bold text-sm text-gray-500 capitalize">
                                    3 days ago
                                </h5>
                            </div>
                        </div>
                        <p className="text-gray-400 p-3 m-0">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, corrupti dolore, magni vero illo deleniti sed, soluta dolorem fuga excepturi deserunt nulla unde voluptatum. Praesentium, eos. Ipsam nisi dolores vitae dignissimos eveniet earum aliquid necessitatibus harum! Autem, beatae commodi in reprehenderit ad cum, expedita hic error, ducimus minima nostrum incidunt.
                        </p>
                        <img width="100%" className='h-[500px] object-cover' src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577" alt="" />
                        <div className="flex m-0 text-center bg-gray-100 p-2">
                            <Link to={`/single-post`} className="text-center px-2 py-2">
                                <BsFillHeartFill className='text-xl font-bold' />
                            </Link>                            <Link to={`/single-post`} className="text-center px-2 py-2">
                                <FaRegCommentDots className='text-xl font-bold' />
                            </Link>
                            <div onClick={() => sharePost(user?._id, post.caption, post?.image)} className="py-2 px-2 text-xl">
                                <RiShareForwardLine />
                            </div>
                        </div>
                        <div className="flex ">
                            <img className='w-[50px] rounded-full h-[50px] m-3 object-cover ' src={user?.image ? user?.image : 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1577'} alt="" />
                            <input type="text" className='w-full outline-0 p-2 ' placeholder='Write something...' />
                        </div>
                    </Card>
                </div>


            </div>
        </>
    )
}

export default UserActivity