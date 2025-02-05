import React, { useState } from 'react'
import { Box, Typography, Button, Grid2, List, ListItem, useTheme, useMediaQuery } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate, useParams } from 'react-router-dom';
import { doctors as filterDoc } from '../assets/assets';
import DoctorCard from '../components/doctor/DoctorCard';

const Doctors = () => {
  const { speciality } = useParams()
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showFilter, setShowFilter] = useState(false)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];
  return (
    <Box sx={{ px: { xs: 2, sm: 3 } }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Browse through the doctors specialist.
      </Typography>

      <Grid2 container spacing={3}>
        {/* Filters Section */}
        <Grid2 xs={12} sm="auto">
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
                    bgcolor: showFilter ? 'primary.dark' : 'action.hover'
                  }
                }}
              >
                Filters
              </Button>
            )}

            <List
              sx={{
                display: { xs: showFilter ? 'flex' : 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 1,
                width: { sm: 240 }
              }}
            >
              {specialities.map((spec) => (
                <ListItem
                  key={spec}
                  onClick={() => navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)}
                  sx={{
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    bgcolor: speciality === spec ? 'primary.light' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: speciality === spec ? 600 : 400,
                      color: speciality === spec ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {spec}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid2>

        {/* Doctors Grid */}
        <Grid2 xs={12} sm>
          <Grid2 container spacing={3}>
            {filterDoc.map((item) => (
              <Grid2 key={item._id} xs={12} sm={6} md={4} lg={3}>
                <DoctorCard
                  item={item}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Doctors
