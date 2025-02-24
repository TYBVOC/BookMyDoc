import React, { useState } from "react";
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
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

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
                    <Avatar>
                      {appointment.patient.charAt(0).toUpperCase()}
                    </Avatar>
                    {appointment.patient}
                  </Box>
                </TableCell>
                <TableCell>{appointment.payment}</TableCell>
                <TableCell>{appointment.age}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar>
                      {appointment.doctor.charAt(0).toUpperCase()}
                    </Avatar>
                    {appointment.doctor}
                  </Box>
                </TableCell>
                <TableCell>{appointment.fees}</TableCell>
                <TableCell>
                  {appointment.cancelled ? (
                    <Typography sx={{ color: "red" }}>Cancelled</Typography>
                  ) : appointment.isCompleted ? (
                    <Typography sx={{ color: "green" }}>Completed</Typography>
                  ) : (
                    <>
                      <IconButton onClick={() => cancelAppointment(item._id)} className="w-10">
                        <CancelIcon  sx={{ color: "red" }}/>
                      </IconButton>
                      <IconButton onClick={() => completeAppointment(item._id)} className="w-10">
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
