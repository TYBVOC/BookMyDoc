import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";


// const initialAppointments = [
//   { id: 1, patient: "Sam", age: "35", date: "6 Mar 2025, 08:30 PM", doctor: "Hema", fees: "₹222", status: "Pending" },
//   { id: 2, patient: "Rohit", age: "NaN", date: "6 Mar 2025, 03:30 PM", doctor: "Deepika", fees: "₹300", status: "Pending" },
//   { id: 3, patient: "jabez", age: "55", date: "3 Mar 2025, 10:30 AM", doctor: "Purva", fees: "₹499", status: "Completed" },
//   { id: 4, patient: "Tanay", age: "80", date: "18 Feb 2025, 10:00 AM", doctor: "Laxmi", fees: "₹150", status: "Cancelled" },
// ];

const AppointmentsTable = () => {
  // const [appointments, setAppointments] = useState(initialAppointments);

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  // const handleCancel = (id) => {
  //   setAppointments((prev) =>
  //     prev.map((appointment) =>
  //       appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment
  //     )
  //   );
  // };

  
  

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        All Appointments
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={appointment?.userData?.image}>{appointment.userData.name}</Avatar>
                  </Box>
                </TableCell>
                <TableCell>{calculateAge(appointment.userData.dob)}</TableCell>
                <TableCell>{ slotDateFormat(appointment.slotDate)},  {appointment.slotTime}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={appointment?.docData.image}>{appointment.docData.name}</Avatar>
                    {/* {appointment.doctor} */}
                  </Box>
                </TableCell>
                <TableCell>{currency} {appointment.amount}</TableCell>
                <TableCell>
                {appointment.cancelled ? (
                    <Typography variant="body2" color="error" fontWeight="medium">
                      Cancelled
                    </Typography>
                    ) : appointment.isCompleted ? (
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
                        sx={{ width: 40, height: 40 }}
                        onClick={()=> cancelAppointment(appointment._id)}
                      >
                        <CancelIcon sx={{color: "red"}} />
                      </IconButton>
                      {/* <IconButton
                        sx={{ width: 40, height: 40, color: "green" }}>
                        <CheckIcon />
                      </IconButton> */}
                    </Box>
                 )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentsTable;
