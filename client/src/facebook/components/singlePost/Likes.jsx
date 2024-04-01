import React from 'react'
import { useSelector } from 'react-redux'

const Likes = ({ setOpen, open, likes }) => {
    console.log(likes)
    const { allUsers } = useSelector(state => state.auth);

    return (
        <>
            <div onClick={() => setOpen(false)} style={{
                transition: 'all 0.3s',
                width: '100%',
                height: `${open ? '80%' : '0'}`,
                background: 'rgba(0,0,0,0.9)'
            }} className="likes bottom-0 rounded-top-5 position-absolute">
                {likes.map((userData) => {
                    return (
                        <>
                            <div className="d-flex align-items-center gap-3 px-3 text-white">
                                <div className="img">
                                    <img width={'70px'} height={'70px'} className="rounded-circle" src="http://res.cloudinary.com/dyxoufsb0/image/upload/v1706291811/TY_my3hqr.jpg" alt="" />
                                </div>
                                <div className="name">
                                    <h6>{userData?.f_name}</h6>
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
        </>
    )
}

export default Likes