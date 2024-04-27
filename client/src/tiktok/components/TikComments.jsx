import { Input } from '@mui/material'
import React from 'react'

const TikComments = () => {
    return (
        <>
            <div className="flex">
                Comments(4039)
            </div>
            <hr />
            <div className="my-3 h-[200px] overflow-y-scroll">

                {Array.from({ length: 5 }).map((_, index) => {
                    return (
                        <>
                            <div className="flex gap-4">
                                <img className='w-[30px] h-[30px] rounded-full' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/af0a0fe78bded864ea7f1200eb84f556~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1714370400&x-signature=0fEGxFeo7WkVP%2BC3cDntKpCzXLI%3D" alt="" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold">
                                        username
                                    </h4>
                                    <p className="text-gray-500">
                                        comment
                                    </p>
                                    <div className="text-gray-300">
                                        1 day ago
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>

            <Input type="text" className='p-2 w-full' placeholder='Add a comment...' />
        </>
    )
}

export default TikComments
