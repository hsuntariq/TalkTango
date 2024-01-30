import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Ske = () => {
    return (
        <>
            <div className="flex items-center px-3 justify-between cursor-pointer transition-all">
                <div className="flex items-center  my-2 gap-4 text-white">
                    <div className="img">
                        <Skeleton width={50} height={50} circle />
                    </div>
                    <div className="user-details">
                        <Skeleton width={90} />
                        <Skeleton width={180} />
                    </div>
                </div>
                <div className="time-info text-end flex justify-end flex-col items-end ">
                    <Skeleton width={40} />
                    <Skeleton height={20} width={20} circle />
                </div>
            </div>
        </>
    )
}

export default Ske
