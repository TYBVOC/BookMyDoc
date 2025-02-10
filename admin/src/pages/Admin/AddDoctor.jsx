import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Avatar,
} from "@mui/material";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    specialty: "General physician",
    degree: "",
    address1: "",
    address2: "",
    about: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Add Doctor
      </Typography>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          {/* Upload Doctor Picture */}
          <Grid item xs={12} display="flex" flexDirection="column" alignItems="flex-start">
            <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
              Upload doctor picture
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>

          {/* Doctor Name */}
          <Grid item xs={12} sm={6}>
            <TextField label="Your Name" name="name" fullWidth onChange={handleChange} />
          </Grid>

          {/* Specialty */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Specialty</InputLabel>
              <Select name="specialty" value={formData.specialty} onChange={handleChange}>
                <MenuItem value="General physician">General Physician</MenuItem>
                <MenuItem value="Cardiologist">Cardiologist</MenuItem>
                <MenuItem value="Neurologist">Neurologist</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Doctor Email */}
          <Grid item xs={12} sm={6}>
            <TextField label="Doctor Email" name="email" fullWidth onChange={handleChange} />
          </Grid>

          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <TextField label="Degree" name="degree" fullWidth onChange={handleChange} />
          </Grid>


          {/* Password */}
          <Grid item xs={12} sm={6}>
            <TextField label="Set Password" type="password" name="password" fullWidth onChange={handleChange} />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField label="Address 1" name="address1" fullWidth onChange={handleChange} />
          </Grid>


          {/* Experience */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select name="experience" value={formData.experience} onChange={handleChange}>
                <MenuItem value="1 Year">1 Year</MenuItem>
                <MenuItem value="2 Years">2 Years</MenuItem>
                <MenuItem value="3+ Years">3+ Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField label="Address 2" name="address2" fullWidth onChange={handleChange} />
          </Grid>


          {/* Fees */}
          <Grid item xs={12} sm={6}>
            <TextField label="Doctor Fees" name="fees" fullWidth onChange={handleChange} />
          </Grid>





          {/* About Doctor */}
          <Grid item xs={12}>
            <TextField
              label="About Doctor"
              name="about"
              fullWidth
              multiline
              rows={3}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="left">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Doctor
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddDoctor;
