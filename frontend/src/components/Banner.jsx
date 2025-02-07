import React from 'react'
import { Box, Typography, Button, useTheme, Grid, Stack, keyframes, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
  100% { transform: translateY(0px); }
`;

const Banner = () => {
    const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: 4,
        px: { xs: 3, sm: 4, md: 6, lg: 8 },
        my: 8,
        mx: { md: 4, lg: 6 },
        overflow: 'hidden',
        position: 'relative',
    }}
    >
      <Grid2 container spacing={3} >
        {/* Left Side */}
        <Grid2 item xs={12} md={6}>
          <Box
            sx={{
              py: { xs: 4, sm: 6, md: 8 },
              pr: { md: 4 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'common.white',
                fontWeight: 600,
                lineHeight: 1.2,
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3.5rem'
                }
              }}
            >
              Book Appointment
              <Box component="span" sx={{ display: 'block', mt: 1.5 }}>
                With 100+ Trusted Doctors
              </Box>
            </Typography>

            <Stack direction="row" spacing={4} sx={{ mt: 4, color: 'common.white' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>500k+</Typography>
                <Typography variant="body2">Patients</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>99%</Typography>
                <Typography variant="body2">Satisfaction</Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              onClick={() => {
                navigate('/login');
                window.scrollTo(0, 0);
              }}
              sx={{
                mt: 4,
                px: 6,
                py: 2,
                borderRadius: 8,
                backgroundColor: 'common.white',
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'common.white',
                },
                transition: 'transform 0.3s ease',
              }}
            >
              Create Account
            </Button>
          </Box>
        </Grid2>

        {/* Right Side */}
        <Grid2 item xs={12} md={6} sx={{ position: "relative", justifySelf: "flex-end", display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              minHeight: 300,
              '&:before': {
                content: '""',
                position: 'absolute',
                right: -40,
                bottom: -40,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(${theme.palette.primary.light} 20%, transparent 70%)`,
              }
            }}
          >
            <Box
              component="img"
              src={assets.appointment_img}
              alt="Medical professionals"
              sx={{
                // position: 'absolute',
                // bottom: 0,
                // right: 0,
                // height: '90%',
                width: '25vw',
                objectFit: "cover",
                animation: {lg: `${floatAnimation} 6s ease-in-out infinite`},
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))',
              }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Banner