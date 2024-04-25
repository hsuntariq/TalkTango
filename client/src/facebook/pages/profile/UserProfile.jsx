import { Card } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import UserActivity from './UserActivity'
import ProfilePicModal from './ProfilePicModal'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const { user, allUsers } = useSelector(state => state.auth)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams()
    const findUser = allUsers.find((item) => {
        return item._id == id
    })
    return (
        <>
            <div className="w-full bg-[#E9EAEE] min-h-screen">

                <div className="container mx-auto">
                    <Card>
                        <div className="flex flex-col relative">
                            <div className="cover-photo">
                                <img width="100%" className='object-cover h-[50vh]' src={findUser?.image ? findUser?.image : 'https://www.trendycovers.com/covers/Black_lamborghini_facebook_cover_1394707831.jpg'} alt="" />
                            </div>

                            <div className="flex absolute gap-10 bottom-10 left-10">

                                <Card onClick={handleOpen} className="gap-4 cursor-pointer h-[200px] w-[200px] border p-3 ">
                                    <img width="100%" className='object-contain ' src={findUser?.image ? findUser?.image : 'https://www.trendycovers.com/covers/Black_lamborghini_facebook_cover_1394707831.jpg'} alt="" />
                                </Card>
                                <ProfilePicModal handleClose={handleClose} handleOpen={handleOpen} open={open} setOpen={setOpen} />
                                <div className="flex flex-col text-3xl self-center capitalize ">
                                    <h3 className="text-white font-bold">
                                        {user?.username}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex gap-5 justify-end px-10 py-2">
                                <Card className="font-bold cursor-pointer text-center p-5">
                                    Timeline
                                </Card>
                                <Card className="font-bold cursor-pointer text-center p-5">
                                    About
                                </Card>
                                <Card className="font-bold cursor-pointer text-center p-5">
                                    Friends
                                </Card>
                                <Card className="font-bold cursor-pointer text-center p-5">
                                    Photos
                                </Card>
                            </div>
                        </div>
                    </Card>
                    <UserActivity />
                </div>
            </div>

        </>
    )
}

export default UserProfile