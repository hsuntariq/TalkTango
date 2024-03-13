import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingUser = () => {
    return (
        <div className="flex gap-3 items-center px-3 py-1">
            <Skeleton width={60} height={60} circle />
            <div className="flex justify-between w-full">
                <div className="user-info">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={200} />
                </div>
                <div className="time">
                    <Skeleton width={40} height={15} />
                </div>
            </div>
        </div>
    )
}

export default LoadingUser