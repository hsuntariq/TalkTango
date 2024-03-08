import { useEffect, useRef, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { IoFilterOutline } from "react-icons/io5";
import UserMessages from "./UserMessages";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllUsers, reset } from "../../features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import Ske from "../../components/loader/Skeleton";
const Sidebar = () => {
  let loop = Array.from({ length: 10 });
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { allUsers, user, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useRef();
  const toggleSettings = () => {
    show.current.classList.toggle("toggle-settings");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch, user, navigate]);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [navigate, search])

  const searchUser = () => {
    const filteredItem = allUsers.filter((user) =>
      user?.username?.toLowerCase().includes(search.toLowerCase())
    );
    return filteredItem;
  };

  // search the users
  useEffect(() => {
    searchUser();
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        style={{
          background: `rgba(${user?.bgTheme})`,
        }}
        className="lg:w-[55%] md:w-[75%] xl:w-[35%] relative  z-[100] min-h-screen bg-orange-500  top-0 overflow-y-scroll h-[100%]"
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
          {loading
            ? loop.map(() => {
              return <Ske />;
            })
            : searchUser()?.map((users) => {
              return <UserMessages key={users._id} {...users} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
