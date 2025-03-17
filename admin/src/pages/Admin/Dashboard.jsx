import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, IconButton, Avatar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import { AdminContext } from "../../context/AdminContext";

const AdminDashboard = () => {
  // const [bookings, setBookings] = useState([
  //   { id: 1, name: "John Doe", date: "6 Mar 2025", status: "Completed" },
  //   { id: 2, name: "Alice Smith", date: "6 Mar 2025", status: "Upcoming" },
  //   { id: 3, name: "Michael Brown", date: "3 Mar 2025", status: "Completed" },
  //   { id: 4, name: "Emma Wilson", date: "18 Feb 2025", status: "Upcoming" },
  // ]);

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }

    // console.log(dashData?.latestAppointments);
    
  }, [aToken])

  // Function to cancel a booking
  // const handleCancelBooking = (bookingId) => {
  //   setBookings((prev) =>
  //     prev.map((booking) =>
  //       booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
  //     )
  //   );
  // };

  return dashData && (
    <div style={{ display: "flex", height: "100vh" }}>
      
    
      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Admin Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <Paper sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <GroupIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6">{dashData.doctors} Doctors</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarMonthIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6">{dashData.appointments} Appointments</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
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
          {dashData.latestAppointments.map((booking, i) => (
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
                <Avatar sx={{ width: 40, height: 40 }} src={booking.userData?.image} />
                <Typography>{booking.userData.name} {booking.slotDate} {booking.slotTime}</Typography>
              </div>

              {booking.cancelled ? (
                <Typography sx={{ color: "red" }}>Cancelled</Typography>
              ) : booking.isCompleted ? (
                <Typography sx={{ color: "green" }}>Completed</Typography>
              ) : (
                <IconButton color="error" onClick={() => cancelAppointment(booking._id)}>
                  <CancelIcon />
                </IconButton>
              )}
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default AdminDashboard;
