import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Paper, Link } from "@mui/material";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log("Login Component Loaded"); 
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (state === "Login") {
      console.log("User logged in:", { email, password });
    } else {
      console.log("User registered:", { name, email, password });
    }
  };

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
