import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'
import Loader from '../timeline/posts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsData, getPostLikes, getSinglePostData, makeComment, reset, sharedPost } from '../../../features/posts/postSlice'
import { Button, Card, Container, FormControl, Input, TextareaAutosize } from '@mui/material'
import Likes from './Likes'
import moment from 'moment'
import { BsFillHeartFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCommentDots, FaRegHeart, FaShare } from 'react-icons/fa6'
import { RiShareForwardLine } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import Comments from './Comments'
const SinglePost = () => {
    const { id, user_id } = useParams()
    const { allUsers, user } = useSelector(state => state.auth)
    const { posts, postLoading, postError, postSuccess, comments, commentLoading, postMessage } = useSelector(state => state.post)
    const [open, setOpen] = useState(false)
    const [caption, setCaption] = useState('')
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)
    useEffect(() => {
        if (comment.length > 0) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [comment])




    // get comments
    useEffect(() => {
        dispatch(getCommentsData({ post_id: id }))
    }, [dispatch, id])



    useState(() => {
        if (postError) {
            toast.error(postMessage)
        }
        dispatch(reset())
    }, [])

    const findUser = () => {
        const user = allUsers.find((person) => {
            return person._id === user_id
        })

        return user
    }


    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id, post_id: p_id
        }
        dispatch(getPostLikes(likeData))
    }



    const sharePost = (user_id, caption, image) => {
        const data = {
            user_id, caption, image
        }

        dispatch(sharedPost(data))
        toast.success('Post shared Successfully!')
    }


    const handleComment = () => {
        const commentData = {
            user_id: user?._id, post_id: id, comment
        }

        dispatch(makeComment(commentData))
        toast.success('Comment Added Successfully!')
        setComment('')
    }


    return (
        <>
            <div className="underlay -z-40  transition-all w-full absolute top-0 md:min-h-[80%] min-h-[50%]" style={{
                clipPath: "polygon(0 0, 100% 0, 100% 42%, 0% 100%)",
                background: 'linear-gradient(45deg,orange,#ff333d,#FFA500,hotpink)',
                animation: 'moveGradient 9s infinite alternate-reverse',
                backgroundSize: '400% 400%'
            }}></div>
            <div className="md:w-3/4 min-h-screen flex justify-center items-center mx-auto">
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
                                <Container className='rounded-xl shadow-xl backdrop-blur-[20px]'>
                                    <div className="flex flex-col md:flex-row shadow pt-5">

                                        <div className="w-full md:w-[70%]">
                                            <Card>

                                                <img className='w-full h-[400px] object-contain' src={post?.image} />
                                            </Card>
                                        </div>
                                        <div className="flex md:w-[30%] flex-col gap-4">
                                            <div className="flex gap-4 ms-4">
                                                <img className='w-[40px] h-[40px] rounded-full' src={findUser()?.image ? (findUser?.image) : ("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")} alt="" />
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

                                            {/* display comments */}

                                            <div className="flex h-[200px] overflow-y-scroll flex-col gap-1">
                                                {commentLoading ? (

                                                    <div className="flex gap-4">
                                                        <Skeleton width={30} height={30} circle />
                                                        <div className="flex flex-col">
                                                            <Skeleton width={200} height={9} />
                                                            <Skeleton width={100} height={9} />
                                                        </div>
                                                    </div>





                                                ) : (comments?.map((comment) => {
                                                    const findUser = allUsers.find((user) => {
                                                        return user?._id == comment?.user_id
                                                    })

                                                    return (
                                                        <>
                                                            <Comments {...comment} findUser={findUser} commentUser={comment?.user_id} comment_id={comment?.id} />
                                                        </>
                                                    )
                                                }))}
                                            </div>


                                            <div className="flex bg-gray-100 flex-col mt-auto">
                                                <p className="text-gray-600 mt-4 ms-2 text-sm font-bold">
                                                    {post?.likes.length} likes
                                                </p>
                                                <div className="flex p-0 m-0 text-center">
                                                    {
                                                        post?.likes?.includes(user?._id) ? (<div onClick={() => updateLikes(user?._id, post?._id)} className="text-center border p-2"><BsFillHeartFill color='red' className='text-xl font-bold' /></div>) : (
                                                            <div onClick={() => updateLikes(user?._id, post?._id)} className=" text-center py-2 px-2"><FaRegHeart className='text-xl font-bold' /></div>
                                                        )
                                                    }
                                                    <div className="text-center px-2 py-2  "><FaRegCommentDots className='text-xl font-bold' /></div>
                                                    <div onClick={() => sharePost(user?._id, caption, post?.image)} className="py-2 px-2 text-xl"><RiShareForwardLine /></div>
                                                </div>
                                                <div className="flex gap-3 ">
                                                    <img className='w-[30px] h-[30px] rounded-full' src={findUser()?.image ? (findUser?.image) : ("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")} alt="" />
                                                    <div className="flex items-center justidy-between w-full">
                                                        <TextareaAutosize

                                                            className='w-full bg-transparent text-sm outline-none text-gray-700'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            placeholder="Add a comment..."
                                                            maxRows={3}
                                                            style={{ width: '100%', resize: 'none' }}
                                                        />
                                                        {show &&
                                                            <IoIosSend onClick={handleComment} size={25} cursor="pointer" className='me-4 text-orange-600' />
                                                        }
                                                        {commentLoading && <CircleLoader size={25} className='me-4' color="orange" />}

                                                    </div>
                                                </div>
                                            </div>

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