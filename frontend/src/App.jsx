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
import Navbar from './components/Navbar'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import { Box } from '@mui/material'


function App() {

  return (
    <Box sx={{ px: { xs: 3, md: 5, lg: 10 }, py: { xs: 3, md: 4, lg: 2 }}} >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
    </Routes>
    <Footer/>
    </Box>
  )
}

export default App
