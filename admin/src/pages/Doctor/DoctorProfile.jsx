import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)

  const updateDoctorProfile = async ()=>{
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      // console.log(updateData);
      

      const {data} = await axios.post(backendUrl+"/api/doctor/update-profile", updateData, {
        headers: {dToken}
      })

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }

      setIsEdit(false)

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (dToken) {
        getProfileData()
    }
  }, [dToken])

  return (
    <div>
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          maxWidth: 256, 
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}
        alt="Profile"
        src={profileData?.image}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: 3,
          backgroundColor: '#ffffff'
        }}
      >
        {/* Doc Info: name, degree, experience */}
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4B4B4B' }}>
          Dr. {profileData?.name}
        </Typography>

        <div sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            {profileData?.degree} - {profileData?.speciality}
          </Typography>
          <Button variant="outlined" size="small" sx={{ paddingY: 0.5, paddingX: 2, borderRadius: '9999px' }}>
            {profileData?.experience}
          </Button>
        </div>

        {/* Doc About */}
        <div>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500, color: '#262626', marginTop: 3 }}>
            About:
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', maxWidth: 700, marginTop: 1 }}>
            {isEdit ? (
              <TextField
                onChange={(e)=> setProfileData((prev)=> ({...prev, about: e.target.value}))}
                value={profileData.about}
                multiline
                rows={8}
                fullWidth
                variant="outlined"
              />
            ) : profileData.about}
          </Typography>
        </div>

        {/* Appointment Fee */}
        <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500, marginTop: 2 }}>
          Appointment fee:{" "}
          <span sx={{ color: '#424242' }}>
            {currency}
            {isEdit ? (
              <TextField
              onChange={(e)=> setProfileData((prev)=> ({...prev, fees: e.target.value}))}
                type="number"
                value={profileData.fees}
                variant="outlined"
                size="small"
              />
            ) : (
              profileData.fees
            )}
          </span>
        </Typography>

        {/* Address */}
        <div sx={{ display: 'flex', gap: 2, paddingY: 2 }}>
          <Typography variant="body2">Address:</Typography>
          <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
            {isEdit ? (
              <TextField
                onChange={(e)=> setProfileData((prev)=> ({...prev.address, line1: e.target.value}))}
                type="text"
                value={profileData.address.line1}
                fullWidth
                variant="outlined"
                size="small"
              />
            ) : (
              profileData.address?.line1 ? profileData.address?.line1 : "Not Available"
            )}
            <br />
            {isEdit ? (
              <TextField
                onChange={(e)=> setProfileData((prev)=> ({...prev.address, line2: e.target.value}))}
                type="text"
                value={profileData.address.line2}
                fullWidth
                variant="outlined"
                size="small"
              />
            ) : (
              profileData.address?.line2 ? profileData.address.line2 : "Not Available"
            )}
          </Typography>
        </div>

        {/* Available Checkbox */}
        <div sx={{ display: 'flex', gap: 1, paddingTop: 2 }}>
          <FormControlLabel
            onChange={(e)=> setProfileData((prev)=> ({...prev, available: !prev.available}))}
            control={<Checkbox checked={profileData.available} />}
            label="Available"
          />
        </div>

        {/* Edit/Save Button */}
        {isEdit ? (
          <Button
          onClick={updateDoctorProfile}
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => setIsEdit((prev) => !prev)}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
  );
};

export default DoctorProfile;
