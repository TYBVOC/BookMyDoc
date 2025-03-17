import React from 'react'
import { Card, CardActionArea,CardMedia, CardContent, Typography, Box, useTheme, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';



const DoctorCard = ({item}) => {
    const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("test");
    
    navigate(`/appointment/${item._id}`);
    window.scrollTo(0, 0);
  };

  // console.log(item.image);
  
  return (
    <Card 
      onClick={handleClick}
      sx={{
        maxWidth: 345,
        transition: 'transform 0.3s ease',
        "&:hover": {
          transform: "translateY(-3%)",
        }
      }}>
      <CardActionArea>
        <CardMedia
          sx={{backgroundSize: "cover", objectFit: "cover"}}
          component="img"
          height="100%"
          image={item.image}
          alt="green iguana"
        />
        <CardContent sx={{textAlign: "left"}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Typography  variant="h5" component="div">
              {item.name}
            </Typography>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              <Box sx={{width: 10, height: 10, backgroundColor: `${item.available ? "green": "red"}`, borderRadius: "50%"}}></Box>
              <Typography  variant="span" sx={{fontWeight: 600}}>{item.available ? 'Available' : "Not Available"}</Typography>
            </Box>
          </Box>
          <Typography variant='span' sx={{fontSize: 13, marginY: "4px", display: "inline-block", fontWeight: 600, color: "white", backgroundColor: "#1976D2", padding: "5px 10px", borderRadius: "20px"}}>{item.speciality}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${item.about.slice(0, 130)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DoctorCard