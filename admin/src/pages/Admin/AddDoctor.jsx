import React, { useContext, useState } from "react";
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
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   experience: "1 Year",
  //   fees: "",
  //   specialty: "General physician",
  //   degree: "",
  //   address1: "",
  //   address2: "",
  //   about: "",
  //   image: null,
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  // };


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onDoctorSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
      if(!docImg){
        return toast.error("Image not selected")
      }

      const formData = new FormData()

      formData.append("image", docImg)
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("experience", experience)
      formData.append("fees", fees)
      formData.append("about", about)
      formData.append("speciality", speciality)
      formData.append("degree", degree)
      formData.append("address", JSON.stringify({line1: address1, line2: address2}))

      const {data} = await axios.post(backendUrl+"/api/admin/add-doctor", formData, {headers:{
        aToken
      }})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  } 

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Add Doctor
      </Typography>
      <form onSubmit={onDoctorSubmitHandler} elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          {/* Upload Doctor Picture */}
          <Grid item xs={12} display="flex" flexDirection="column" alignItems="flex-start">
            <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
              Upload doctor picture
              <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" hidden  />
            </Button>
          </Grid>

          {/* Doctor Name */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={(e)=> setName(e.target.value)} value={name} label="Your Name" name="name" fullWidth />
          </Grid>

          {/* Specialty */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Specialty</InputLabel>
              <Select name="specialty" onChange={(e)=> setSpeciality(e.target.value)} value={speciality} >
                <MenuItem value="General physician">General Physician</MenuItem>
                <MenuItem value="Cardiologist">Cardiologist</MenuItem>
                <MenuItem value="Neurologist">Neurologist</MenuItem>
                <MenuItem value="Gastroenterologist">Gastroenterologist</MenuItem>
                <MenuItem value="Pediatricians">Pediatricians</MenuItem>
                <MenuItem value="Dermatologist">Dermatologist</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Doctor Email */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={(e)=> setEmail(e.target.value)} value={email} label="Doctor Email" name="email" fullWidth />
          </Grid>

          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={e => setDegree(e.target.value)} value={degree}  label="Degree" name="degree" fullWidth />
          </Grid>


          {/* Password */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={e => setPassword(e.target.value)} value={password} label="Set Password" type="password" name="password" fullWidth />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={e => setAddress1(e.target.value)} value={address1} label="Address 1" name="address1" fullWidth  />
          </Grid>


          {/* Experience */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select name="experience" onChange={e => setExperience(e.target.value)} value={experience} >
                <MenuItem value="1 Year">1 Year</MenuItem>
                <MenuItem value="2 Year">2 Year</MenuItem>
                <MenuItem value="3 Year">3 Year</MenuItem>
                <MenuItem value="4 Year">4 Year</MenuItem>
                <MenuItem value="5 Year">5 Year</MenuItem>
                <MenuItem value="6 Year">6 Year</MenuItem>
                <MenuItem value="8 Year">8 Year</MenuItem>
                <MenuItem value="9 Year">9 Year</MenuItem>
                <MenuItem value="10 Year">10 Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField onChange={e => setAddress2(e.target.value)} value={address2} label="Address 2" name="address2" fullWidth />
          </Grid>


          {/* Fees */}
          <Grid item xs={12} sm={6}>
            <TextField onChange={e => setFees(e.target.value)} value={fees} label="Doctor Fees" name="fees" fullWidth  />
          </Grid>





          {/* About Doctor */}
          <Grid item xs={12}>
            <TextField
              onChange={e => setAbout(e.target.value)} value={about}
              label="About Doctor"
              name="about"
              fullWidth
              multiline
              rows={3}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="left">
            <Button type="submit" variant="contained" color="primary">
              Add Doctor
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddDoctor;
