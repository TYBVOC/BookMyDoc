import React, {useRef} from 'react'
import { specialityData } from '../assets/assets';

import { Box, Typography, Grid, useTheme, useMediaQuery, IconButton, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';




const SpecialityMenu = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const scrollContainerRef = useRef(null);
    
    const handleScroll = (scrollOffset) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += scrollOffset;
      }
    };
  return (
    <Box 
      id="speciality"
      sx={{
        py: 12,
        px: 2,
        backgroundColor: 'background.paper',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h3" 
        sx={{
          mb: 2,
          fontWeight: 500,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.875rem'
          }
        }}
      >
        Find by Speciality
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{
          mb: 5,
          maxWidth: { sm: '60%', md: '40%' },
          mx: 'auto',
          color: 'text.secondary'
        }}
      >
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {/* {!isMobile && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                left: -40,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText'
                }
              }}
              onClick={() => handleScroll(-300)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: -40,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText'
                }
              }}
              onClick={() => handleScroll(300)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )} */}

        <Grid2
          container
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: "center",
            justifyContent: "center",
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 6,
              display: "none"
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'divider',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.main',
              borderRadius: 2,
            },

            paddingLeft: {xs:"10rem", sm: "0rem"}
            
          }}
        >
          {specialityData.map((item, index) => (
            <Grid2 item key={index} sx={{ flexShrink: 0, px: 2 }}>
              <Box
                component={Link}
                to={`/doctors/${item.speciality}`}
                onClick={() => window.scrollTo(0, 0)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  width: 120,
                  transition: 'transform 0.3s ease',
                   '&:hover': {
                     transform: 'translateY(-8px)',
                     '& img': {
                       boxShadow: 3,
                     },
                     '& p': {
                       color: 'primary.main',
                    }
                   }
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.speciality}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    backgroundColor: 'background.default',
                    p: 1.5,
                    boxShadow: 1,
                    transition: 'all 0.3s ease'
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    textAlign: 'center',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.speciality}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  )
}

export default SpecialityMenu