import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography, Paper, Avatar, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doctors } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({speciality, docId}) => {
    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
      if (doctors.length > 0 && speciality) {
          const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
          setRelDoc(doctorsData)
      }
  }, [doctors, speciality, docId])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={8} color="#262626">
      <Typography variant="h4" fontWeight="bold">
        Related Doctors
      </Typography>
      <Typography variant="body2" textAlign="center" sx={{ width: { xs: "90%", sm: "33%" } }}>
        Simply browse through our extensive list of trusted doctors.
      </Typography>

      {/* Doctor Cards */}
      <Grid2 container spacing={3} justifyContent="center" sx={{ px: { xs: 3, sm: 0 }, mt: 4 }}>
        {relDoc.map((item, index) => (
          <Grid2 key={index} xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.5s",
                "&:hover": { transform: "translateY(-10px)" },
                border: "1px solid #C9D8FF",
              }}
            >
              <Avatar
                variant="square"
                src={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  height: 180,
                  backgroundColor: "#EAEFFF",
                  objectFit: "cover"
                }}
              />
              <Box p={2} textAlign="center">
                <Box display="flex" alignItems="center" gap={1} justifyContent="center" mb={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: item.available ? "green" : "gray",
                    }}
                  />
                  <Typography variant="body2" color={item.available ? "green" : "gray"}>
                    {item.available ? "Available" : "Not Available"}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="medium">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.speciality}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default RelatedDoctors