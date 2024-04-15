import UserCard from './UserCard'
import StoryCard from './StoryCard'
import './story.css'
const Story = () => {
    return (
        <>
            <div className="container w-3/4 mx-auto mt-4 relative top-20" >
                <div className="flex justify-between items-center">
                    <h2 className="text-1xl text-gray-800 font-bold my-2">
                        Stories
                    </h2>
                    <button className="text-blue-500">
                        See All
                    </button>
                </div>
                <div className="flex story-bar" style={{
                    flexWrap: 'nowrap',
                    overflowX: 'scroll'
                }}>
                    <UserCard />
                    {Array.from({ length: 8 }).map((index) => {
                        return <StoryCard key={index} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Story