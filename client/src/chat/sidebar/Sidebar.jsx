import { useEffect, useState } from "react"
import SidebarHeader from "./SidebarHeader"
import { IoFilterOutline } from "react-icons/io5";
import UserMessages from "./UserMessages";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllUsers, reset } from "../../features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { allUsers, user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()



    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (isError) {
            toast.error(message)
        } else {
            dispatch(getAllUsers())
        }

        dispatch(reset());
    }, [isError, message, dispatch, user, navigate])

    // search the users
    useEffect(() => {
        setLoading(true)
        setFilteredUsers(allUsers)
        const debounce = setTimeout(() => {
            const filteredItem = allUsers.filter((user) => user?.username?.toLowerCase().includes(search.toLowerCase()));
            setFilteredUsers(filteredItem);
            setLoading(false)
        }, 300);

        return () => clearTimeout(debounce)
    }, [search, allUsers])


    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="w-full md:w-[500px] bg-[#111B21] min-h-screen sticky top-0">
                <SidebarHeader />
                <form className="flex items-center gap-2 justify-between px-3 my-1 w-full top-[10%] py-2 z-50 bg-[#111B21]">
                    <input type="text" className="w-full bg-[#202C33] rounded-md p-1 px-2" placeholder="Search or start a new chat" value={search} onChange={handleChange} />
                    <IoFilterOutline color="white" size={20} />
                </form>
                <div className="max-h-screen overflow-y-scroll">
                    {loading ? (
                        <Loader />
                    ) : (
                        filteredUsers?.map((users) => {
                            return <UserMessages key={users._id} {...users} />
                        })
                    )}


                </div>

            </div>
        </>
    )
}

export default Sidebar
