import Footer from "./Footer"
import MessageHeader from "./MessageHeader"
import Messages from "./Messages"

const MessageScreen = () => {
    return (
        <div className='w-full sticky top-0 flex flex-col  min-h-screen '>
            <MessageHeader />
            <Messages />
            <Footer />
        </div>
    )
}

export default MessageScreen
