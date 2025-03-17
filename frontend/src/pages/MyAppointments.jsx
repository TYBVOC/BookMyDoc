import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Divider } from "@mui/material";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  //  fetching appointments with dummy data
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {

        const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

        if (data.success) {
            toast.success(data.message)
            getUserAppointments()
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token]);

  return (
    <Box ml={12} mt={5}>
      <Typography variant="h7" paddingBottom={2} marginBottom={5}>
        My Appointments

      </Typography>
      <Grid container spacing={3}>
        {appointments.map((item, index) => (
          <Grid item xs={11} key={index}>
            <Card sx={{boxShadow: 0 , borderBottom:1, borderBottomColor:"#D3D3D3"}} >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <CardMedia component="img" image={item.docData.image} alt={item.docData.name} sx={{ width: 144, backgroundColor: '#EAEFFF' }} />
                </Grid>
                <Grid item xs>
                  <CardContent>
                    <Typography variant="h6">{item.docData.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.docData.speciality}</Typography>
                    <Typography variant="subtitle2" marginTop={1}>Address:</Typography>
                    <Typography variant="body2">{item.docData.address.line1}</Typography>
                    <Typography variant="body2">{item.docData.address.line2}</Typography>
                    <Typography variant="body2" marginTop={1} fontWeight="medium">
                      Date & Time: {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                      <Button variant="outlined" onClick={() => setPayment(item._id)}>
                        Pay Online
                      </Button>
                    )}
                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                      <Button variant="outlined">
                        Pay with Stripe
                      </Button>
                    )}
                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                      <Button variant="outlined">
                        Pay with Razorpay
                      </Button>
                    )}
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <Button variant="contained" sx={{ backgroundColor: '#EAEFFF', color: '#696969' }}>
                        Paid
                      </Button>
                    )}
                    {item.isCompleted && (
                      <Button variant="outlined" color="success">
                        Completed
                      </Button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <Button onClick={()=>cancelAppointment(item._id)} variant="outlined" color="error">
                        Cancel Appointment
                      </Button>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <Button variant="outlined" color="error">
                        Appointment Cancelled
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyAppointments;
