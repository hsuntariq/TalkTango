import { Triangle } from 'react-loader-spinner'

const Loader = ({ color }) => {
    return (
        <div className="min-h-[70vh] w-full flex justify-center items-center">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color={color}
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader
