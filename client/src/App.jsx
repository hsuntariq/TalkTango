import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './authentication/Register'
import Login from "./authentication/Login"
import Home from "./chat/Home"
import MessagePanel from "./chat/messagebar/MessagePanel"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from "./components/error/Error"
import OTP from "./authentication/OTP"
import 'react-loading-skeleton/dist/skeleton.css'
import EnterEmail from "./authentication/forgotten_password/EnterEmail"
import ResetPass from "./authentication/forgotten_password/ResetPass"
import Audio from "./Audio"

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/message-panel/:receiver_id' element={<MessagePanel />} />
            <Route path='/verify/:id' element={<OTP />} />
            <Route path='/forgotten-password' element={<EnterEmail />} />
            <Route path='/reset-password/:id' element={<ResetPass />} />
            <Route path='/audio' element={<Audio />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
