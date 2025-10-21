import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EmailVerify from './pages/VerifyEmail'
  import { ToastContainer} from 'react-toastify';

const App = () => {
  return <div className="bg-[url('./assets/bgImage.svg')] bg-contain">
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/verify-email' element={<EmailVerify/>}/>
    </Routes>
    
    </div>
}

export default App
