import './App.css';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Signup, Login, Profile, VerifyEmail, ForgetPassword} from "./components"
import './App.css'
import PasswordRequest from './components/PasswordRequest'

function App() {

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/otp/verify' element={<VerifyEmail/>} />
          <Route path='/forget-password' element={<PasswordRequest/>} />
          <Route path='/password-reset-confirm/:uid/:token' element={<ForgetPassword/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
