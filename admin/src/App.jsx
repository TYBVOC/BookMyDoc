import React from "react";
import { Box, styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Login from "./pages/Login";

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: "250px", 
  paddingTop: theme.spacing(10), 
}));

const App = () => {
  const login = true;

  return login ? (
    <>
      <Navbar />
      <MainContainer>
        <ContentContainer>
          <ToastContainer />
        <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            
            <Route path="/doctors-list" element={<DoctorsList />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </>
  ) : (
    <Login />
  );
};

export default App;
