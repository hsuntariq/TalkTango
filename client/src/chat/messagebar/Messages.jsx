import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";

const Messages = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }


        dispatch(reset())
    }, [user, navigate, dispatch])
    return (
        <>
            <div className="messages flex flex-col justify-between sticky top-0 bg-contain min-h-screen">

            </div>

        </>
    )
}

export default Messages
