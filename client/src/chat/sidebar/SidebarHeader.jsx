import { TiMessages, TiGroupOutline } from "react-icons/ti";
import { SiMediamarkt } from "react-icons/si";
import { HiOutlineDotsVertical, HiOutlineX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Card } from "@mui/material";
const socket = io.connect("http://localhost:5174");
const SidebarHeader = ({ toggleSettings }) => {
  const { user, isSuccess } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const show = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(reset());
  }, [navigate, user, dispatch]);

  const openMenu = () => {
    setOpen(!open);
    show.current.classList.toggle("scale-100");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    socket.emit("dis", { id: user?._id });
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          background: `rgba(${user?.bgTheme})`,
        }}
        className="flex justify-between items-center px-3 p-1 bg-[#202C33] "
      >
        <div className="user-image flex items-center gap-2 capitalize font-bold">
          <div className="img rounded-full w-[45px] h-[45px]">
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                user?.image
                  ? user?.image
                  : "https://cdn-icons-png.flaticon.com/512/9655/9655066.png"
              }
              alt=""
            />
          </div>
          <div className="text-1xl text-white">{user?.username}</div>
        </div>
        <div className="icons text-1xl text-white flex gap-4">
          <Link to={`/fb-home/${user?._id}`}>
            <img
              width="20px"
              src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1a278c71bbabe7ede906fdf89fff24cc/tagger-by-sprout-social.png"
              alt=""
            />
          </Link>
          <Link to={`/fb-home/${user?._id}`}>
            <img
              width="20px"
              src="https://images.squarespace-cdn.com/content/v1/628d474d42a5fb5beca0c477/37a2ab98-52c8-41f5-9903-dc5e80f9decd/Be+A+Changemaker.png"
              alt=""
            />
          </Link>
          <Link to={`http://localhost:5000/camfilter`}>
            <img
              width="20px"
              src="https://cdn-icons-png.flaticon.com/512/11187/11187154.png"
              alt=""
            />
          </Link>

          <div className="relative">
            {open ? (
              <img
                width="20px"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                onClick={openMenu}
                className="cursor-pointer  text-red-600"
              />
            ) : (
              <img
                width="20px"
                src="https://cdn-icons-png.flaticon.com/512/4386/4386669.png"
                alt=""
                onClick={openMenu}
                className="cursor-pointer "
              />
            )}
            <div
              style={{
                background: `rgba(${user?.bgTheme})`,
                border: "1px solid black",
              }}
              ref={show}
              className="flex-flex-col rounded-md bg-[#17242c] absolute right-1 scale-0 top-5 transition"
            >
              <Card className="list-unstyled  flex flex-col gap-1 text-white font-semibold py-2 ">
                <span
                  onClick={toggleSettings}
                  className="cursor-pointer w-full px-4 py-1 transition-all hover:bg-gray-400 mt-1"
                >
                  Setting
                </span>
                <span
                  onClick={handleLogout}
                  className="cursor-pointer w-full px-4 py-1 transition-all hover:bg-gray-400 "
                >
                  Logout
                </span>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
