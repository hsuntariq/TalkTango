import Header from './Header'

import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Story from '../../components/timeline/stories/Story'
import MainSuggestions from '../../components/suggestions/MainSuggestions'

const Home = () => {



    return (
        <>
            <div className="w-full min-h-screen  bg-gray-100">

                <Header />
                <div className="flex flex-col min-w-[100vw] overflow-x-scroll gap-5 md:flex-row">
                    <div className="w-full md:w-1/5">
                        <Sidebar />
                    </div>
                    <div className="w-full md:w-[60%] ">
                        <Story />
                        <Timeline />
                    </div>
                    <div className="mt-[4rem] overflow-y-scroll w-1/5 h-[90%] bg-white p-3 md:fixed right-0 top-0 ">
                        <MainSuggestions />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home