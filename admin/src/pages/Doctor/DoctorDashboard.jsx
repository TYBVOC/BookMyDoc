import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from '@mui/icons-material/Check';
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Doe", date: "6 Mar 2025", status: "Completed" },
    { id: 2, name: "Alice Smith", date: "6 Mar 2025", status: "Upcoming" },
    { id: 3, name: "Michael Brown", date: "3 Mar 2025", status: "Completed" },
    { id: 4, name: "Emma Wilson", date: "18 Feb 2025", status: "Upcoming" },
  ]);

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Doctor Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <Paper
              sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}
            >
              <GroupIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6">{currency} {dashData.earnings} Earnings</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}
            >
              <CalendarMonthIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6">{dashData.appointments} Appointments</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}
            >
              <GroupIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6">{dashData.patients} Patients</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Latest Bookings */}
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Latest Bookings
          </Typography>
          {dashData?.latestAppointments.slice(0, 5).map((booking, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar src={booking.userData.image} sx={{ width: 40, height: 40 }} />
                <Typography>
                  {booking.userData.name} - {slotDateFormat(booking.slotDate)}
                </Typography>
              </div>

              {booking.cancelled ? (
                <Typography variant="body2" color="error" fontWeight="medium">
                  Cancelled
                </Typography>
              ) : booking.isCompleted ? (
                <Typography
                  variant="body2"
                  color="success.main"
                  fontWeight="medium"
                >
                  Completed
                </Typography>
              ) : (
                <Box display="flex">
                  <IconButton
                    onClick={()=> cancelAppointment(booking._id)}
                    sx={{ width: 40, height: 40 }}
                  >
                    <CancelIcon sx={{color: "red"}} />
                  </IconButton>
                  <IconButton
                    onClick={()=>completeAppointment(booking._id)}
                    sx={{ width: 40, height: 40 }}
                  >
                    <CheckIcon sx={{color: "green"}} />
                  </IconButton>
                </Box>
              )} 
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default DoctorDashboard;
