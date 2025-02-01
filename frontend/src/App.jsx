import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Verify from './pages/Verify'


function App() {

  return (
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/doctors' element={<Doctors/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/my-appointments' element={<MyAppointments />} />
    <Route path='/my-profile' element={<MyProfile />} />
    <Route path='/verify' element={<Verify />} />
  </Routes>
  )
}

export default App
