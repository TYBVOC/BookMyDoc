import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { 
  Grid2, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import RelatedDoctors from "../components/RelatedDoctors";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSolts = async () => {

      setDocSlots([])

      // getting current date
      let today = new Date()

      for (let i = 0; i < 7; i++) {

          // getting date with index 
          let currentDate = new Date(today)
          currentDate.setDate(today.getDate() + i)

          // setting end time of the date with index
          let endTime = new Date()
          endTime.setDate(today.getDate() + i)
          endTime.setHours(21, 0, 0, 0)

          // setting hours 
          if (today.getDate() === currentDate.getDate()) {
              currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
              currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
          } else {
              currentDate.setHours(10)
              currentDate.setMinutes(0)
          }

          let timeSlots = [];


          while (currentDate < endTime) {
              let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
              let day = currentDate.getDate()
              let month = currentDate.getMonth() + 1
              let year = currentDate.getFullYear()

              const slotDate = day + "_" + month + "_" + year
              const slotTime = formattedTime

              const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

              if (isSlotAvailable) {

                  // Add slot to array
                  timeSlots.push({
                      datetime: new Date(currentDate),
                      time: formattedTime
                  })
              }

              // Increment current time by 30 minutes
              currentDate.setMinutes(currentDate.getMinutes() + 30);
          }

          setDocSlots(prev => ([...prev, timeSlots]))

      }

  }

  const bookAppointment = async () => {

    if (!token) {
        toast.warning('Login to book appointment')
        return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + " " + month + " " + year

    try {

        const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
        if (data.success) {
            toast.success(data.message)
            getDoctorsData()
            navigate('/my-appointments')
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

  }

  useEffect(() => {
    if (doctors.length > 0) {
        fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
      if (docInfo) {
        getAvailableSolts()
      }
  }, [docInfo])



  return docInfo ? (
    <Box sx={{ px: { xs: 2, sm: 4, md: 20 }, py: 4 }}>
    {/* Doctor Details */}
    <Grid2 container spacing={3} alignItems="center">
      <Grid2 item xs={12} sm={4} md={3}>
        <Box
          component="img"
          src={docInfo.image}
          alt="Doctor"
          sx={{
            width: "100%",
            maxWidth: 288,
            borderRadius: 2,
            backgroundColor: "primary.main",
          }}
        />
      </Grid2>

      <Grid2  xs={12} sm={8} md={9} sx={{alignSelf: "flex-start",width: "50%"}}>
        <Box
          elevation={2}
          sx={{
            p: 3,
            // width: "100%",
            // backgroundColor: "red",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" color="text.primary" sx={{fontSize: "3rem"}}>
              Dr. {docInfo.name}
            </Typography>
            <Avatar src="/path-to-verified-icon.png" sx={{ width: 20, height: 20 }} />
          </Box>

          <Box display="flex" alignItems="center" gap={1} >
            <Typography variant="body1" color="text.secondary" sx={{fontSize: "1.5rem"}}>
              {docInfo.degree} - {docInfo.speciality}
            </Typography>
            <Button variant="outlined" size="small" sx={{ borderRadius: 16, fontSize: "0.75rem" }}>
              {docInfo.experience}
            </Button>
          </Box>

          <Box mt={1}>
            <Typography variant="h6" color="text.primary" sx={{fontWeight: 600, opacity: 0.7, display: "flex", alignItems: "center", gap: 1}}>
              About <Avatar src={assets.info_icon} sx={{ width: 15, height: 15 }} />
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {docInfo.about}
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary" mt={2} sx={{fontWeight: 600}}>
            Appointment Fee: <Typography sx={{fontWeight: 600}}  component="span">{currencySymbol}{docInfo.fees}</Typography>
          </Typography>
        </Box>
      </Grid2>
    </Grid2>

    {/* Booking Slots */}
    <Box mt={4}>
      <Typography variant="h5" color="text.secondary" >
        Booking Slots:
      </Typography>

      {/* Date Selection */}
      <Box display="flex" height={100} gap={1} overflow="auto" mt={2}>
        {docSlots.length && docSlots?.map((day, index) => (
          <Paper
            key={index}
            onClick={() => setSlotIndex(index)}
            sx={{
              p: 2,
              minWidth: 84,
              height: 85,
              borderRadius: 20,
              cursor: "pointer",
              bgcolor: index === slotIndex ? "primary.main" : "background.paper",
              color: index === slotIndex ? "common.white" : "text.secondary",
              borderColor: index === slotIndex ? "primary.main" : "text.secondary",
              textAlign: "center",
            }}
          >
            <Typography>{day[0] && daysOfWeek[day[0].datetime.getDay()]}</Typography>
            <Typography>{day[0] && day[0].datetime.getDate()}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Time Slots */}
      <Box display="flex" gap={1} overflow="auto" mt={2}>
        {docSlots.length > 0 && docSlots[slotIndex].map((time, i) => (
            <Button
              key={i}
              variant="outlined"
              onClick={() => setSlotTime(time.time)}
              sx={{
                borderRadius: 20,
                flexShrink: 0,
                px: 3,
                py: 0.5,
                color: time.time === slotTime ? "common.white" : "text.secondary",
                borderColor: time.time === slotTime ? "primary.main" : "text.secondary",
                bgcolor: time.time === slotTime ? "#1976D2" : "background.paper",
              }}
            >
              {time.time}
            </Button>
          )
        )}
      </Box>

      <Button onClick={bookAppointment} variant="contained" sx={{ borderRadius: 20, px: 5, py: 1.5, mt: 3 }}>
        Book an Appointment
      </Button>
    </Box>
    <RelatedDoctors speciality={docInfo.speciality} docId={docId}/>
  </Box>
  ): null
};

export default Appointment;
