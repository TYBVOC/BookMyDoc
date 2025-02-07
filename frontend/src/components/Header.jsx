import React from 'react'
import Box from '@mui/material/Box';
import { Button, Typography, useTheme } from '@mui/material';
import {assets} from "../assets/assets.js"

const Header = () => {

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: 'wrap',
        backgroundColor: 'primary.main',
        px: { xs: 3, md: 5, lg: 10 },
        py: { xs: 5, md: '10vw' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
          gap: 4,
          mb: { md: -7.5 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'common.white',
            fontWeight: 600,
            lineHeight: 1.25,
            fontSize: {
              xs: '1.875rem',  // 30px
              md: '2.25rem',   // 36px
              lg: '3rem'       // 48px
            }
          }}
        >
          Book Appointment<br />
          With Trusted Doctors
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 3,
            color: 'common.white',
          }}
        >
          <Box
            component="img"
            src={assets.group_profiles}
            alt="Patient profiles"
            sx={{ width: 112 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 300,
              lineHeight: 1.5,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Simply browse through our extensive list of trusted doctors,<br />
            schedule your appointment hassle-free.
          </Typography>
        </Box>

        <Button
          variant="contained"
          href="#speciality"
          endIcon={
            <Box
              className='arrow-icon'
              component="img"
              src={assets.arrow_icon}
              sx={{ 
                width: 12,
                transition: 'transform 0.3s ease', 
                '&:hover': {
                  transform: 'rotate(60deg)', 
                },
              }}
              
              alt="Arrow icon"
            />
          }
          sx={{
            backgroundColor: 'common.white',
            color: '#595959',
            borderRadius: 28,
            px: 4,
            py: 1.5,
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: 'common.white',
            },
            transition: 'transform 0.3s ease',
          }}
        >
          Book appointment
        </Button>
      </Box>

      <Box
        sx={{
          width: { md: '50%' },
          position: 'relative',
          mt: { xs: 4, md: 0,  },
          height: { md: '100%' },
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          component="img"
          src={assets.header_img}
          alt="Doctor illustration"
          sx={{
            width: {xs:'100%', sm: "80%"},
            marginTop: "20%",
            borderRadius: theme.shape.borderRadius,
            position: { md: 'absolute' },
          }}
        />
      </Box>
    </Box>
  )
}

export default Header