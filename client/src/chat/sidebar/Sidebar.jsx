import { useEffect, useRef, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { IoFilterOutline } from "react-icons/io5";
import UserMessages from "./UserMessages";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllUsers, reset } from "../../features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Settings from "./Settings";
import Ske from "../../components/loader/Skeleton";
import LoadingUser from "./LoadingUser";
const Sidebar = () => {
  let loop = Array.from({ length: 10 });
  const [search, setSearch] = useState("");
  const { allUsers, user, isLoading, isSuccess, isError, message } =

    useSelector((state) => state.auth);
  const { received_id, sender_id } = useParams()
  const { chatLoading } = useSelector(state => state.chat)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useRef();
  const toggleSettings = () => {
    show.current.classList.toggle("toggle-settings");
  };

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])


  const findUser = () => {
    const foundUsers = allUsers?.filter((foundUser) => {
      return foundUser?.username.toLowerCase().startsWith(search)
    })


    return foundUsers;

  }

  useEffect(() => {
    findUser()
  }, [search])




  const handleChange = (e) => {
    setSearch(e.target.value);
  };




  return (
    <>
      <div
        style={{
          background: `rgba(${user?.bgTheme})`,
        }}
        className="lg:w-[55%] md:w-[75%] xl:w-[35%] relative  z-[100] min-h-screen bg-orange-500  top-0 overflow-y-hidden h-[100%]"
      >
        <Settings show={show} toggleSettings={toggleSettings} />
        <SidebarHeader toggleSettings={toggleSettings} />
        <form
          style={{
            background: `rgba(${user?.bgTheme})`,
          }}
          className="flex items-center gap-2 justify-between px-3 my-1 w-full top-[10%] py-2 z-50 bg-[#111B21]"
        >
          <input
            type="text"
            className="w-full rounded-md p-1 px-2"
            placeholder="Search or start a new chat"
            value={search}
            onChange={handleChange}
          />
          <IoFilterOutline color="white" size={20} />
        </form>
        <div className="max-h-[86vh] overflow-y-scroll">

          {findUser()?.map((users) => {
            return <UserMessages key={users._id} {...users} />;
          })}

        </div>
      </div>
    </>
  );
};

export default Sidebar;
