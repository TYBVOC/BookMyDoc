import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100dvh",
  backgroundColor: theme.palette.background.paper,
}));

const Form = styled(Box)(({ theme }) => ({
  minHeight: "10vh",
  maxWidth: "40vh",
  width: "100%",
  backgroundColor: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  color: "#1565C0",
}));

const InputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  borderColor: `${theme.palette.text.secondary}`,
}));

const FormButton = styled(Button)(({ theme }) => ({
  width: "100%",
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  marginTop: theme.spacing(2),
}));

const StyledSpan = styled("span")({
  color: "#42A5F5",
  textDecoration: "underline",
  cursor: "pointer"
});

const Login = () => {
  const [loginState, setLoginState] = useState("Admin");

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAToken} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const backendUrl = import.meta.env.VITE_BACKEND_URL  


  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginState === "Admin") {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else if (loginState === "Doctor") {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleLogin} component="form" >
        <FormTitle variant="h5">{loginState} Login</FormTitle>
        <Box>
          <InputField onChange={(e)=> setEmail(e.target.value)} value={email} label="Email" variant="outlined" />
        </Box>
        <Box paddingTop={"1rem"}>
          <InputField onChange={(e)=> setPassword(e.target.value)} value={password} label="Password" variant="outlined" />
        </Box>
        <FormButton type="submit" variant="contained">Login</FormButton>
        <Typography
          sx={{
            fontSize: "0.9rem",
            paddingY: "0.5rem",
            textAlign: "center",
          }}
        >
          {loginState === "Admin"? "Doctor": "Admin"} Login?
          {loginState === "Admin" ? (
            <StyledSpan component={Link} onClick={()=> setLoginState("Doctor")}>Click here.</StyledSpan>
          ) : (
            <StyledSpan component={Link} onClick={()=> setLoginState("Admin")}>Click here.</StyledSpan>
          )}{" "}
        </Typography>
      </Form>
    </FormContainer>
  );
};

export default Login;
