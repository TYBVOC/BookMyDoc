import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginState === "Admin") {
      console.log("Admin Login");
    } else if (loginState === "Doctor") {
      console.log("Doctor Login");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleLogin} component="form" >
        <FormTitle variant="h5">{loginState} Login</FormTitle>
        <Box>
          <InputField label="Email" variant="outlined" />
        </Box>
        <Box paddingTop={"1rem"}>
          <InputField label="Password" variant="outlined" />
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
