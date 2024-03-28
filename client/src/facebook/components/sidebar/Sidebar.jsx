import React from 'react'
import { useSelector } from 'react-redux'
import { SyncLoader } from 'react-spinners'
const Sidebar = () => {
    const { user, isLoading } = useSelector(state => state.auth)
    if (isLoading) {
        return <SyncLoader />
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Home</h4>
                <a href="">Create</a>

            </div>
            <div className="d-flex align-items-center gap-3">
                <img width={'60px'} style={{
                    height: '60px',
                    borderRadius: '50%'
                }} src="https://4.bp.blogspot.com/-23zvGymeTyA/XhV9fNzozsI/AAAAAAAAL2E/Gru5mTIARdAoiO4wVFAVOqv6K916UP89QCLcBGAsYHQ/s1600/Facebook-new-design.jpg" alt="" />
                <h6 className='text-capitalize'>
                    {isLoading ? (
                        <SyncLoader />
                    ) : (
                        `${user?.f_name} ${user?.l_name} `
                    )}
                </h6>
            </div>
            <hr />
        </>
    )
}

export default Sidebar