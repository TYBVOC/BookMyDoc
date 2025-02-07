import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { assets } from "../assets/assets.js";

const ContactUs = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 3, md: 5, lg: 10 },
        py: { xs: 5, md: 10 },
      }}
    >
     
      <Box
        component="img"
        src={assets.contact_image}  
        alt="Doctor and patient"
        sx={{
          width: { xs: '40%', md: '30%' },
          borderRadius: theme.shape.borderRadius,
        }}
      />

   
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          px: { xs: 2, md: 5 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          CONTACT <span style={{ color: theme.palette.primary.main }}>US</span>
        </Typography>
        
        <Box>
          <Typography variant="h6" fontWeight={600}>OUR OFFICE</Typography>
          <Typography variant="body2">
            54709 Willms Station, Suite 350, Washington, USA
          </Typography>
          <Typography variant="body2">Tel: (415) 555-0132</Typography>
          <Typography variant="body2">Email: greatstackdev@gmail.com</Typography>
        </Box>
        
        <Box>
          <Typography variant="h6" fontWeight={600}>CAREERS AT PRESCRIPTO</Typography>
          <Typography variant="body2">
            Learn more about our teams and job openings.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, borderRadius: 2 }}
          >
            Explore Jobs
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;