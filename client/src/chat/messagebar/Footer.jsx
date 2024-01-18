import { HiEmojiHappy, HiMicrophone, HiPlus } from "react-icons/hi"
import { useSelector } from "react-redux"

const Footer = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <>
            <div style={{
                background: `rgba(${user?.bgTheme})`,

            }} className="flex w-full bg-[#1A2329] justify-between items-center  p-3 gap-3 relative md:bottom-[6.8rem] text-white">
                <div className="flex gap-3">
                    <HiEmojiHappy className="cursor-pointer text-2xl" />
                    <HiPlus className="cursor-pointer text-2xl" />
                </div>
                <input style={{
                    background: `rgba(${user?.bgTheme})`
                }} type="text" placeholder="Type a message" className={`border focus:outline-none rounded-md w-full p-1`} />
                <HiMicrophone className="cursor-pointer text-2xl" />
            </div>
        </>
    )
}

export default Footer
