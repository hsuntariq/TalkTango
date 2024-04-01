import Header from './Header'

import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Story from '../../components/timeline/stories/Story'

const Home = () => {



    return (
        <>
            <div className="w-full bg-gray-100">
                
            <Header />
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full md:w-1/5">
                    <Sidebar />
                </div>
                <div className="w-full md:w-3/5 ">
                    <Story />
                    <Timeline />
                </div>
            </div>
        </div>
        </>

    )
}

export default Home