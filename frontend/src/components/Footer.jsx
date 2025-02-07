import React from 'react'
import { Grid2, Typography, Box, Divider, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { assets } from '../assets/assets';

const Footer = () => {
    const theme = useTheme();
  return (
    <Box sx={{ mx: { md: 10 }, mt: 15 }}>
      <Grid2 container spacing={6} sx={{ my: 4, display: "flex", justifyContent: "space-between" }}>
        {/* Logo and Description */}
        <Grid2 xs={12} sm={6} md={3}>
          <Box component="img" 
            //    src={assets.logo} 
               alt="Company Logo" 
               sx={{ mb: 2, width: 160 }} />
          <Typography variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        lineHeight: 1.6,
                        width: { md: '80%' }
                      }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Typography>
        </Grid2>

        <Box sx={{display: "flex", gap: 15}}>
            {/* Company Links */}
            <Grid2 xs={12} sm={6} md={1.5}>
            <Typography variant="h6" 
                        sx={{ 
                            fontWeight: 500, 
                            mb: 2,
                            fontSize: '1.125rem'
                        }}>
                COMPANY
            </Typography>
            <List dense sx={{ p: 0 }}>
                {['Home', 'About us', 'Delivery', 'Privacy policy'].map((item, i) => (
                <ListItem key={i} 
                            sx={{ 
                            px: 0, 
                            py: 0.5,
                            color: 'text.secondary'
                            }}>
                    <Typography variant="body2">{item}</Typography>
                </ListItem>
                ))}
            </List>
            </Grid2>

            {/* Contact Info */}
            <Grid2 xs={12} sm={6} md={1.5}>
            <Typography variant="h6" 
                        sx={{ 
                            fontWeight: 500, 
                            mb: 2,
                            fontSize: '1.125rem'
                        }}>
                GET IN TOUCH
            </Typography>
            <List dense sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5, color: 'text.secondary' }}>
                <Typography variant="body2">+91 212-456-7890</Typography>
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5, color: 'text.secondary' }}>
                <Typography variant="body2">bookmydoc@gmail.com</Typography>
                </ListItem>
            </List>
            </Grid2>

        </Box>
      </Grid2>

      {/* Copyright Section */}
      <Box sx={{ mt: 4 }}>
        <Divider sx={{ borderColor: 'divider' }} />
        <Typography variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      py: 3,
                      color: 'text.secondary'
                    }}>
          Copyright 2024 @ BookMyDoc.com - All Right Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer