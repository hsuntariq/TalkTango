import logo from "../../assets/frontImages/3.jpg";
const Welcome = () => {
  return (
    <>
      <img
        className="welcome min-h-screen object-cover w-full"
        src={logo}
        alt=""
      />
      {/* <video src="./home.mp4" loop autoPlay muted className="w-[100%] sticky top-0 flex flex-col  min-h-screen object-cover "></video> */}
    </>
  );
};

export default Welcome;
