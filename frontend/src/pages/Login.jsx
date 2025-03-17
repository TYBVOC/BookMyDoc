import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography, Paper, Link } from "@mui/material";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      
      const {data} = await axios.post(backendUrl+"/api/user/register", {name, email, password})
      
      if(data.success){
        toast.success("Registered Successfully!!")
        localStorage.setItem("token", data.token)
        setToken(data.token)
        navigate("/")
      }else{
        toast.error(data.message)
      }

    } else {
      const {data} = await axios.post(backendUrl+"/api/user/login", {email, password})
      
      if(data.success){
        toast.success("LoggedIn Successfully!!")
        localStorage.setItem("token", data.token)
        setToken(data.token)
        navigate("/")
      }else{
        toast.error(data.message)
      }
    }
  };

  
  

  // useEffect(() => {
  //   if (token) {
  //     navigate('/')
  //   }
  // }, [token])

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {state === "Login" ? "Login" : "Create Account" }
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please {state === "Login" ?  "log in": "sign up"} to book an appointment.
        </Typography>

        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 2 }}>
          {state !== "Login" && (
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <Link
                component="button"
                onClick={() => setState("Login")}
                sx={{ textDecoration: "underline" }}
              >
                Login here
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link
                component="button"
                onClick={() => setState("Sign Up")}
                sx={{ textDecoration: "underline" }}
              >
                Create One
              </Link>
            </>
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
