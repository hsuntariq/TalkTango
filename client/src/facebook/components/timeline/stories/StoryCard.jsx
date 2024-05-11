import { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleStoryModal from './SingleStoryModal'

const StoryCard = ({ content, myUser,caption }) => {
    const { user, allUsers } = useSelector(state => state.auth)

    const findUser = allUsers?.find((item) => {
        return item?._id == myUser
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div onClick={handleOpen} className="w-full cursor-pointer relative md:w-1/2">
                <div className="relative border w-[100px] h-[120px] rounded-md">
                    <img className='object-cover' style={{ height: '100%' }} src={content} alt="" />
                    <div className="user-image absolute top-0 p-2 bg-gray-600/50 rounded-full">
                        <img width={'30px'} style={{
                            height: '30px',
                            borderRadius: '50%'
                        }} src={user.image ? user.image : 'https://cdn-icons-png.flaticon.com/512/9655/9655066.png'} alt="" />
                    </div>
                    <h6 className="text-center absolute bottom-0 text-white px-2 text-sm font-bold">
                        {findUser?.username}
                    </h6>
                </div>
            </div >
            <SingleStoryModal findUser={findUser} caption={caption} content={content} handleOpen={handleOpen} handleClose={handleClose} open={open} setOpen={setOpen} />
        </>
    )
}

export default StoryCard