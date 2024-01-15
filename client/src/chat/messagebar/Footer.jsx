import { HiEmojiHappy, HiMicrophone, HiPlus } from "react-icons/hi"

const Footer = () => {
    return (
        <>
            <div className="flex w-full bg-[#1A2329] justify-between items-center  p-3 gap-3 relative md:bottom-[6.8rem]">
                <div className="flex gap-3">
                    <HiEmojiHappy className="cursor-pointer text-2xl" />
                    <HiPlus className="cursor-pointer text-2xl" />
                </div>
                <input type="text" placeholder="Type a message" className="border focus:outline-none rounded-md w-full p-1 bg-[#1A2329]" />
                <HiMicrophone className="cursor-pointer text-2xl" />
            </div>
        </>
    )
}

export default Footer
