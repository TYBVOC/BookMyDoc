import React from 'react'
import { Box, Grid2, Typography, Avatar, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import { VerifiedUser, Info } from '@mui/icons-material';

const MyAppointments = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    "Appointements"
  )
}

export default MyAppointments
