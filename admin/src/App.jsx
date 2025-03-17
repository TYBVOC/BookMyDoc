import React, { useContext } from "react";
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
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";

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

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <>
      <ToastContainer/>
      <Navbar />
      <MainContainer>
        <ContentContainer>
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Done */}
            <Route path="/admin-dashboard" element={<Dashboard />} /> {/* Done */}
            <Route path="/all-appointments" element={<AllAppointments />} /> {/* Done */}
            <Route path="/add-doctor" element={<AddDoctor />} /> {/* Done */}
            
            <Route path="/doctors-list" element={<DoctorsList />} />{/* Done */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </>
  ) : (
    <>
      <ToastContainer/>
      <Login />
    </>
  );
};

export default App;
