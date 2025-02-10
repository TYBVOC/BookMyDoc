import React, { useState } from "react";
import { Card, CardContent, Typography, Checkbox, Grid, Avatar, Box } from "@mui/material";

const doctors = [
  {
    id: 1,
    name: "Dr. Richard James",
    specialty: "General Physician",
    image: "https://www.sonicseo.com/wp-content/uploads/2020/07/surgeon.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    image: "https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?w=2000",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    image: "https://leman-clinic.ch/wp-content/uploads/2018/11/02.jpg",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    image: "https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?w=2000",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    image: "https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?w=2000",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    image: "https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?w=2000",
    available: true,
  },
  {
    id: 7,
    name: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    image: "https://leman-clinic.ch/wp-content/uploads/2018/11/02.jpg",
    available: false,
  },
  {
    id: 8,
    name: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    image: "https://leman-clinic.ch/wp-content/uploads/2018/11/02.jpg",
    available: false,
  },
];

const DoctorsList = () => {
  const [doctorData, setDoctorData] = useState(doctors);

  const handleAvailabilityChange = (id) => {
    setDoctorData((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.id === id ? { ...doctor, available: !doctor.available } : doctor
      )
    );
  };

  return (
    <Grid container spacing={3} sx={{ padding: "20px", justifyContent: "center" }}>

      {doctorData.map((doctor) => (

        <Grid item key={doctor.id}>

          <Card
            sx={{
              width: 280,
              height: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
              padding: 1,
              borderRadius: "12px",
              boxShadow: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 5, borderColor: "secondary.main" },
            }}
          >
            {/* Image section */}
            <Box
              sx={{
                width: "100%",
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px 12px 0 0",

              }}
            >
              <Avatar
                src={doctor.image}
                alt={doctor.name}
                sx={{
                  width: "75%",
                  height: "91%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Text section */}
            <CardContent sx={{ width: "100%", textAlign: "left", ml: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{doctor.name}</Typography>
              <Typography variant="body2" color="text.secondary">{doctor.specialty}</Typography>

              {/* Availability Checkbox */}
              <Box sx={{ display: "flex", alignItems: "center", ml: -1 }}>
                <Checkbox
                  checked={doctor.available}
                  onChange={() => handleAvailabilityChange(doctor.id)}
                  color="primary"
                />
                <Typography variant="body2">Available</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorsList;
