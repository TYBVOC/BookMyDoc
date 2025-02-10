import React from 'react';
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { assets } from "../assets/assets.js";

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 3, md: 10 }, py: { xs: 5, md: 10 } }}>
  
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={assets.about_image} 
            alt="Doctors"
            sx={{ width: '85%', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={14} md={6}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            ABOUT <span style={{ color: theme.palette.primary.main }}>US</span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments
            and managing their health records.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the
            gap between patients and healthcare providers, making it easier for you to access the care you need, when
            you need it.
          </Typography>
        </Grid>
      </Grid>


      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          WHY <span style={{ color: theme.palette.primary.main }}>CHOOSE US</span>
        </Typography>
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {[ 
            { title: "EFFICIENCY:", text: "Streamlined appointment scheduling that fits into your busy lifestyle." },
            { title: "CONVENIENCE:", text: "Access to a network of trusted healthcare professionals in your area." },
            { title: "PERSONALIZATION:", text: "Tailored recommendations and reminders to help you stay on top of your health." }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Card 
                sx={{
                  backgroundColor: index === 0 ? 'primary.main' : 'white',
                  color: index === 0 ? 'white' : 'black',
                  width: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 5
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
                  <Typography variant="body2">{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;
