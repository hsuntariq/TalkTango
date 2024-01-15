import Sidebar from "../sidebar/Sidebar"
import MessageScreen from "./MessageScreen"

const MessagePanel = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:fixed w-full  top-0">
                <Sidebar />
                <MessageScreen />
            </div>
        </>
    )
}

export default MessagePanel
