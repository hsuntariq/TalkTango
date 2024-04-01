import React from 'react'
import image2 from '../assets/frontImages/2-removebg.png'
const HomePage = () => {
  return (
    <>
      <main>
        <div className="underlay -z-40  transition-all w-full absolute top-0 md:min-h-[80%] min-h-[50%]" style={{
        clipPath: "polygon(0 0, 100% 0, 100% 42%, 0% 100%)",
          background: 'linear-gradient(45deg,orange,#ff333d,#FFA500,hotpink)',
          animation: 'moveGradient 9s infinite alternate-reverse',
          backgroundSize:'400% 400%'
      }}>
      </div> 

        <div className="flex flex-col  md:flex-row w-full md:w-3/4  mx-auto justify-between items-center font-bold  md:h-[90vh] p-5">
          <div className="left flex flex-col gap-2 text-center md:text-start">

          <h1 className="text-6xl text-center md:text-start ">
            Talk Tango
          </h1>
          <h3 className="text-3xl text-gray-800">
            Connect,Create & Celebrate
          </h3>
            <p className="text-gray-700">
             A single place to start a <span className='uppercase font-bold text-blue-800'> mingle </span>
            </p>
            <div className="flex gap-5 sm:justify-center md:justify-start">

            <button className="px-5 py-1 bg-purple-700 text-white rounded-full">
              Login
            </button>
            <button className="px-5 py-1  border border-purple-500 rounded-full">
              Sign Up
            </button>
            </div>
          </div>
          <div className="right sm:w-3/4 ">
            <img width="100%" src={image2} alt="" />
          </div>
      </div>
        
      </main>
    </>
  )
}

export default HomePage
