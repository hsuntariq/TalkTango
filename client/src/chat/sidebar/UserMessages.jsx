import { Link } from "react-router-dom"

const UserMessages = ({ _id, username, phone }) => {
    return (
        <Link to='/message-panel' className="flex items-center px-3 justify-between cursor-pointer hover:bg-[#202C33] transition-all">
            <div className="flex items-center  my-2 gap-4 text-white">
                <img src="https://github.com/hsuntariq/whatsapp_clone/raw/main/assets/whatsapp.PNG" alt="" className="w-[50px] h-[50px] rounded-full" />
                <div className="">
                    <h6>{username}</h6>
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit.
                    </p>
                </div>
            </div>
            <div className="time-info text-end flex justify-end flex-col items-end ">
                <p className="text-gray-700">
                    2.17pm
                </p>
                <div className="h-5 text-end w-5 p-1 flex items-center justify-center rounded-full bg-orange-500">
                    <h6>2</h6>
                </div>
            </div>
        </Link>
    )
}

export default UserMessages
