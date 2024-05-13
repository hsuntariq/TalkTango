import React, { useEffect, useState } from 'react'
import Header from '../../../pages/home/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainSuggestions from '../../suggestions/MainSuggestions'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'
import { getStoryData, reset } from '../../../../features/stories/storySlice'
import { Card } from '@mui/material'
import StoryModalNew from './StoryModalNew'
import { getAllUsers } from '../../../../features/auth/authSlice'
const AllStories = () => {
    const { stories, storyLoading, storyError, storyMessage } = useSelector(state => state.story)
    const { user, allUsers } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    useEffect(() => {
        if (storyError) {
            toast.error(storyMessage)
        }
        dispatch(getStoryData())
        dispatch(getAllUsers())
        dispatch(reset())
    }, [dispatch, storyError, storyMessage])


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const findUser = allUsers?.map((item, index) => {
        const findStory = stories.find((story) => story.user === user._id);
        return findStory
    })


    let data;


    return (
        <>
            <div className="w-full min-h-screen  bg-gray-100">

                <Header />
                <div className="flex flex-col min-w-[100vw] overflow-x-scroll gap-5 md:flex-row">
                    <div className="w-full md:w-1/5">
                        <Sidebar />
                    </div>
                    <div className="w-full md:w-[60%] grid gap-3 mt-20 h-[90vh] overflow-scroll grid-cols-3">
                        {storyLoading ? (
                            <>

                                {Array.from({ length: 6 }).map((_, index) => {
                                    return (
                                        <>
                                            <Skeleton width={300} height={400} key={index} />
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {stories?.map((story) => {
                                    data = story
                                    return (
                                        <>

                                            <Card onClick={handleOpen} className="">
                                                <img className='w-full h-full object-cover' src={story?.content} alt="" />
                                            </Card>

                                        </>
                                    )
                                })}
                                <StoryModalNew data={data} handleOpen={handleOpen} handleClose={handleClose} open={open} setOpen={setOpen} />
                            </>
                        )}
                    </div>
                    <div className="mt-[4rem] overflow-y-scroll w-1/5 h-[90%] bg-white p-3  right-0 top-0 ">
                        <MainSuggestions />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllStories
