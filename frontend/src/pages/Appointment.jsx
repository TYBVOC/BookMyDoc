import React, { useState } from "react";
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

const Appointment = () => {

  const [docInfo, setDocInfo] = useState(false)
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 20 }, py: 4 }}>
    {/* Doctor Details */}
    <Grid2 container spacing={3} alignItems="center">
      <Grid2 item xs={12} sm={4} md={3}>
        <Box
          component="img"
          src={assets.doc13}
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
              Dr. Marea
            </Typography>
            <Avatar src="/path-to-verified-icon.png" sx={{ width: 20, height: 20 }} />
          </Box>

          <Box display="flex" alignItems="center" gap={1} >
            <Typography variant="body1" color="text.secondary" sx={{fontSize: "1.5rem"}}>
              MBBS - General Physician
            </Typography>
            <Button variant="outlined" size="small" sx={{ borderRadius: 16, fontSize: "0.75rem" }}>
              2 Years
            </Button>
          </Box>

          <Box mt={1}>
            <Typography variant="h6" color="text.primary" sx={{fontWeight: 600, opacity: 0.7, display: "flex", alignItems: "center", gap: 1}}>
              About <Avatar src={assets.info_icon} sx={{ width: 15, height: 15 }} />
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary" mt={2} sx={{fontWeight: 600}}>
            Appointment Fee: <Typography sx={{fontWeight: 600}}  component="span">₹722</Typography>
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
        {["Thu 6", "Fri 7", "Sat 8", "Sun 9", "Mon 10", "Tue 11", "Wed 12"].map((day, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              minWidth: 84,
              height: 85,
              borderRadius: 20,
              cursor: "pointer",
              bgcolor: index === 0 ? "primary.main" : "background.paper",
              color: index === 0 ? "common.white" : "text.secondary",
              // border: "1px solid black",
              borderColor: index === 0 ? "primary.main" : "text.secondary",
              textAlign: "center",
            }}
          >
            <Typography>{day.split(" ")[0]}</Typography>
            <Typography>{day.split(" ")[1]}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Time Slots */}
      <Box display="flex" gap={1} overflow="auto" mt={2}>
        {["03:00 pm", "04:00 pm", "04:30 pm", "05:00 pm", "05:30 pm", "06:00 pm"].map(
          (time, index) => (
            <Button
              key={index}
              variant="outlined"
              sx={{
                borderRadius: 20,
                flexShrink: 0,
                px: 3,
                py: 0.5,
                color: index === 0 ? "common.white" : "text.secondary",
                borderColor: index === 0 ? "primary.main" : "text.secondary",
                bgcolor: index === 0 ? "#1976D2" : "background.paper",
              }}
            >
              {time}
            </Button>
          )
        )}
      </Box>

      <Button variant="contained" sx={{ borderRadius: 20, px: 5, py: 1.5, mt: 3 }}>
        Book an Appointment
      </Button>
    </Box>
    <RelatedDoctors/>
  </Box>
  );
};

export default Appointment;
