import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
}));


const RoleBadge = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(0.5, 2),
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 24,
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(12),
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  fontSize: theme.typography.pxToRem(14),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


const Navbar = () => {
  const theme = useTheme()

  const aToken = true;

  return (
    <HeaderContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{fontSize: theme.typography.h4}}>BookMyDoc</Typography>
          <RoleBadge variant="body2">
            {aToken ? 'Admin' : 'Doctor'}
          </RoleBadge>
        </Box>
        <LogoutButton 
          variant="contained" 
          sx={{
            px: [2, 4],
            py: 1
          }}>
        Logout
      </LogoutButton>
    </HeaderContainer>
  )
}

export default Navbar