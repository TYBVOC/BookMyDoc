import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, List, ListItem, useTheme, useMediaQuery } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate, useParams } from 'react-router-dom';
import { doctors as filterDoc } from '../assets/assets';
import DoctorCard from '../components/doctor/DoctorCard';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [showFilter, setShowFilter] = useState(false);
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }


  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])
  
  

  return (
    <Box sx={{ px: { xs: 2, sm: 3 } }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', my: 2, fontSize: '1.5rem' }}>
        Browse through the doctors specialist.
      </Typography>

      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} sm="auto">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilter(!showFilter)}
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: showFilter ? 'primary.main' : 'transparent',
                  color: showFilter ? 'common.white' : 'text.primary',
                  '&:hover': {
                    bgcolor: showFilter ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                Filters
              </Button>
            )}

            <List
              sx={{
                display: { xs: showFilter ? 'flex' : 'none', lg: 'flex' },
                flexDirection: 'column',
                gap: 1,
                width: { sm: 200 },
              }}
            >
              {specialities.map((spec) => (
                <ListItem
                  key={spec}
                  onClick={() =>
                    navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)
                  }
                  sx={{
                    borderRadius: 1,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    bgcolor: speciality === spec ? 'primary.light' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      color: 'black',
                    },
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: speciality === spec ? 500 : 400,
                      color: speciality === spec ? 'white' : 'text.secondary',
                    }}
                  >
                    {spec}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Doctors Grid */}
        <Grid container spacing={3} marginTop={3} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
          {filterDoc.map((item) => (
            <Grid item key={item._id} sx={{ display: 'flex' }}>
              <DoctorCard
                item={item}
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  window.scrollTo(0, 0);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Doctors;
