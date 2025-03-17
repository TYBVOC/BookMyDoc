import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, TextField, Select, MenuItem, Typography, Card, CardContent, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Divider } from "@mui/material";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [touched, setTouched] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    console.log(file);

    if (file) {
      setImage(file); 
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const updateUserProfileData = async () => {
    if (!validatePhoneNumber(userData.phone)) {
      toast.error('Invalid phone number. It must be 10 digits.');
      return;
    }

    if (new Date(userData.dob) > new Date()) {
      toast.error('Date of Birth cannot be in the future.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <Card sx={{ maxWidth: 500, p: 3, ml: 9, boxShadow: 0 }}>
      <CardContent>
        {isEdit ? (
          <label htmlFor="image">
            <input
              type="file"
              id="image"
              hidden
              onChange={handleImageChange} // Function to handle image change
            />
            <Avatar
              sx={{
                width: 100,
                height: 100,
                cursor: 'pointer',
                borderRadius: '50%',
                marginBottom: 2,
              }}
              src={image ? URL.createObjectURL(image) : userData.image} // Show selected image or existing image
            />
            <CloudUploadIcon sx={{ position: 'relative', top: -30, left: 70 }} />
          </label>
        ) : (
          <Avatar
            sx={{ width: 100, height: 100, marginBottom: 2 }}
            src={userData.image}
          />
        )}


        {isEdit ? (
          <TextField
            fullWidth
            variant='outlined'
            label='Name'
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ mt: 2 }}
          />
        ) : (
          <Typography variant='h5' sx={{ mt: 2 }}>
            {userData.name}
          </Typography>
        )}

        <Divider sx={{ backgroundColor: '#ADADAD', height: 2, my: 2 }} />

        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 2 }}>
          Contact Information
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          Email: {userData.email}
        </Typography>
        {isEdit ? (
          <TextField
            fullWidth
            variant='outlined'
            label='Address'
            value={userData.Address}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, Address: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography variant='body2' sx={{ mb: 1 }}>
            Address: {userData.Address}
          </Typography>
        )}

        {isEdit ? (
          <TextField
            fullWidth
            variant='outlined'
            label='Phone'
            value={userData.phone}
            error={touched && !validatePhoneNumber(userData.phone)}
            helperText={touched && !validatePhoneNumber(userData.phone) ? 'Enter a valid 10-digit phone number' : ''}
            onChange={(e) => {
              setTouched(true);
              setUserData((prev) => ({ ...prev, phone: e.target.value }));
            }}
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography variant='body2' sx={{ mb: 2 }}>
            Phone: {userData.phone}
          </Typography>
        )}
        {isEdit ? (
          <Select
            fullWidth
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value='Not Selected'>Not Selected</MenuItem>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        ) : (
          <Typography variant='body2' sx={{ mb: 2 }}>
            Gender: {userData.gender}
          </Typography>
        )}

        {isEdit ? (
          <TextField
            fullWidth
            type='date'
            variant='outlined'
            label='Date of Birth'
            InputLabelProps={{ shrink: true }}
            value={userData.dob}
            error={new Date(userData.dob) > new Date().setHours(0, 0, 0, 0)}
            helperText={new Date(userData.dob) > new Date().setHours(0, 0, 0, 0) ? 'Date of Birth cannot be in the future' : ''}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography variant='body2' sx={{ mb: 2 }}>
            Birthday: {userData.dob}
          </Typography>
        )}
        <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3, width: '100%' }}
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
        >
            {isEdit ? 'Save Information' : 'Edit'}
        </Button>

        {/* <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: "100%" }}
          onClick={() => {
            if (isEdit) {
              const isPhoneValid = validatePhoneNumber(userData.phone);
              const dobDate = new Date(userData.dob);
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              if (!isPhoneValid) {
                toast.error('Invalid phone number. It must be 10 digits.');
                return;
              }

              if (dobDate > today) {
                toast.error('Date of Birth cannot be in the future.');
                return;
              }

              // console.log("Saved Data:", userData);

              setIsEdit(false);
            } else {
              setIsEdit(true);
            }
          }}
        >
          {isEdit ? 'Save Information' : 'Edit'}
        </Button> */}

      </CardContent>
    </Card>



  ) : null;
};

export default MyProfile;