import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './authentication/Register'
import Login from "./authentication/Login"
import Home from "./chat/Home"
import MessagePanel from "./chat/messagebar/MessagePanel"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from "./components/error/Error"
import OTP from "./authentication/OTP"
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
            <Route path='/message-panel/:id' element={<MessagePanel />} />
            <Route path='/verify/:id' element={<OTP />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
