import React from 'react'
import { assets } from '../assets/assets'
import { Box, Typography, Grid, Button, useTheme, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoctorCard from "./doctor/DoctorCard"
import { doctors } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const theme = useTheme()
    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    // const doctors = [
    //     {
    //         _id: "jfhjdh",
    //         image: assets.doc12,
    //         name: "Ness Fern",
    //         speciality: "Bio Hacking",
    //         available: true
    //     },
    //     {
    //         _id: "jfhjdhfgdg",
    //         image: assets.doc13,
    //         name: "Ness Fern",
    //         speciality: "Homopatheic",
    //         available: true
    //     },
    //     {
    //         _id: "jfhjdhfgdg",
    //         image: assets.doc14,
    //         name: "Ness Fern",
    //         speciality: "Homopatheic",
    //         available: true
    //     },
    // ]


  return (
    <Box
      sx={{
        my: 8,
        mx: { xs: 2, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontWeight: 500,
          fontSize: { xs: '1.875rem', md: '2.25rem' },
          color: 'text.primary',
        }}
      >
        Top Doctors to Book
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 5,
          maxWidth: { sm: '80%', md: '40%' },
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        Simply browse through our extensive list of trusted doctors.
      </Typography>

      <Grid2
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          width: '100%',
          px: { xs: 1, sm: 0 },
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        {doctors?.slice(0, 3).map((doctor, i)=>(
            <DoctorCard key={doctor._id} item={doctor}/>
        ))}
       
      </Grid2>

      <Button
        variant="outlined"
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        sx={{
          px: 6,
          py: 1.5,
          borderRadius: 28,
          borderWidth: 2,
          textTransform: 'none',
          color: 'primary.main',
          borderColor: '#1976D2',
          //   backgroundColor: 'primary.light',
          '&:hover': {
              backgroundColor: '#1976D2',
              borderColor: '#1976D2',
              boxShadow: theme.shadows[2],
              color: 'white',
          },
        }}
      >
        View All Doctors
      </Button>
    </Box>
  )
}

export default TopDoctors