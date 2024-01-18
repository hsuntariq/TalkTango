/* eslint-disable react/prop-types */
import { BlockPicker, ChromePicker, CirclePicker, TwitterPicker } from "react-color"
import { IoClose } from "react-icons/io5"
import { useSelector } from "react-redux"
import { BarLoader } from "react-spinners"
const SetThemePanel = ({ openThemes, setOpenThemes, color, handleColorChange, setThemeColor, color2, handleColorChange2, chatTheme }) => {
    const { user, isLoading, themeLoading } = useSelector(state => state.auth)
    return (
        <div style={{
            background: `#1A2329`
        }} className={`w-full transition-[1s] min-h-screen bg-[#1A2329] z-50 fixed top-0 ${openThemes || 'translate-y-[100%]'}`}>
            <IoClose size={40} cursor='pointer' onClick={() => setOpenThemes(false)} />
            <div className="picker w-full flex flex-col items-center justify-center">
                <ChromePicker color={color} onChange={handleColorChange} className='w-full' />
                <button disabled={isLoading} onClick={setThemeColor} className={`w-1/2 my-3 flex justify-center items-center bg-blue-600 py-1 rounded-full hover:bg-blue-800 ${isLoading && 'bg-blue-900 text-white disabled cursor-not-allowed'}`}>
                    {isLoading ?
                        <div className='flex flex-col justify-center items-center gap-2 '>
                            <p>Updating...</p>
                            <BarLoader
                                color="white"
                                loading={isLoading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"

                            /></div> : 'Upate theme'}
                </button>
                <h3 className="text-2xl fw-bold my-2">Chat Theme</h3>
                <TwitterPicker color={color2} onChange={handleColorChange2} className='w-full' />
                <button disabled={themeLoading} onClick={chatTheme} className={`w-1/2 my-3 flex justify-center items-center bg-blue-600 py-1 rounded-full hover:bg-blue-800 ${isLoading && 'bg-blue-900 text-white disabled cursor-not-allowed'}`}>
                    {themeLoading ?
                        <div className='flex flex-col justify-center items-center gap-2 '>
                            <p>Updating...</p>
                            <BarLoader
                                color="white"
                                loading={themeLoading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"

                            /></div> : 'Upate theme'}
                </button>
            </div>


        </div>
    )
}

export default SetThemePanel
