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
import CheckIcon from '@mui/icons-material/Check';
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";

const initialAppointments = [
  {
    id: 1,
    patient: "Sam",
    payment: "cash",
    age: "35",
    date: "6 Mar 2025, 08:30 PM",
    doctor: "Hema",
    fees: "₹222",
    status: "Pending",
    cancelled: false,
    isCompleted: false,
  },
  {
    id: 2,
    patient: "Rohit",
    payment: "cash",
    age: "NaN",
    date: "6 Mar 2025, 03:30 PM",
    doctor: "Deepika",
    fees: "₹300",
    status: "Pending",
    cancelled: true,
    isCompleted: false,
  },
  {
    id: 3,
    patient: "jabez",
    payment: "cash",
    age: "55",
    date: "3 Mar 2025, 10:30 AM",
    doctor: "Purva",
    fees: "₹499",
    status: "Completed",
    cancelled: false,
    isCompleted: true,
  },
  {
    id: 4,
    patient: "Tanay",
    payment: "cash",
    age: "80",
    date: "18 Feb 2025, 10:00 AM",
    doctor: "Laxmi",
    fees: "₹150",
    status: "Cancelled",
    cancelled: true,
    isCompleted: false,
  },
];

const DoctorAppointments = () => {
  // const [appointments, setAppointments] = useState(initialAppointments);

  // const handleCancel = (id) => {
  //   setAppointments((prev) =>
  //     prev.map((appointment) =>
  //       appointment.id === id
  //         ? { ...appointment, status: "Cancelled" }
  //         : appointment
  //     )
  //   );
  // };

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])


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
              <TableCell>Payment</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={appointment?.userData.image}>
                      {appointment.userData.name}
                    </Avatar>
                    {/* {appointment.patient} */}
                  </Box>
                </TableCell>
                <TableCell>{appointment.payment?'Online':'CASH'}</TableCell>
                <TableCell>{calculateAge(appointment.userData.dob)}</TableCell>
                <TableCell>{slotDateFormat(appointment.slotDate)}, {appointment.slotTime}</TableCell>
                <TableCell>{currency}{appointment.amount}</TableCell>
                <TableCell>
                  {appointment.cancelled ? (
                    <Typography sx={{ color: "red" }}>Cancelled</Typography>
                  ) : appointment.isCompleted ? (
                    <Typography sx={{ color: "green" }}>Completed</Typography>
                  ) : (
                    <>
                      <IconButton onClick={() => cancelAppointment(appointment._id)} className="w-10">
                        <CancelIcon  sx={{ color: "red" }}/>
                      </IconButton>
                      <IconButton onClick={() => completeAppointment(appointment._id)} className="w-10">
                        <CheckIcon sx={{ color: "green" }}/>
                      </IconButton>
                    </>
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

export default DoctorAppointments;
