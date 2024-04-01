import Header from './Header'

import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Story from '../../components/timeline/stories/Story'

const Home = () => {



    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/5">
                    <Sidebar />
                </div>
                <div className="w-full md:w-3/5">
                    <Story />
                    <Timeline />
                </div>
            </div>
        </>

    )
}

export default Home