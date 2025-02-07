import React from 'react'
import {Box, styled} from "@mui/material"
import {ToastContainer} from "react-toastify"
import {Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import Login from './pages/Login'

const MainContainer = styled(Box)(({theme})=>({
  paddingLeft: theme.spacing(9),
  paddingRight: theme.spacing(9)
}))

const App = () => {

  const login = false


  return login ? (
    <>
      <Navbar/>
      <MainContainer>
        <ToastContainer/>
        <Box>
          <SideBar/>
          <Routes>
              <Route path='/' element={<></>} />
              <Route path='/admin-dashboard' element={<Dashboard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />
              <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
              <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
              <Route path='/doctor-profile' element={<DoctorProfile/>} />
          </Routes>
        </Box>
      </MainContainer>
    </>
  ): (<Login/>)
}

export default App