import UserCard from './UserCard'
import StoryCard from './StoryCard'
import './story.css'
const Story = () => {
    return (
        <>
            <div className="container mt-4" >
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