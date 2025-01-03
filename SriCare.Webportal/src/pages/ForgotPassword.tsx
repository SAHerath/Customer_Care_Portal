import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../services/authService";
import { theme } from "../services/customColor";
import Logo from "../assets/logo.png";
import Cover from "../assets/abstract.png";

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);

  const handlefoget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const response = await postRequest('/auth/forgotPassword', formData);
  
    if (response) {
      console.log('Request Sent:', response);
      setStatus("A reset link has been sent to your email.");
    } else {
      console.log('Login failed');
      setStatus("Error: Unable to send reset email. Please try again later.");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };  


  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        // bgcolor="palegreen"
        sx={{
          backgroundImage:`url(${Cover})`,
          backgroundRepeat: "repeat",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: '30px', maxWidth: '400px', width: '100%' }}
        >
          <Box textAlign="center">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: '230px',
                objectFit: 'contain',
                marginBottom: '5px',
              }}
            />
          </Box>
          <Typography variant="h5" textAlign="center" marginBottom={2}>
            Forgot password?
          </Typography>
          {status && (
          <Typography
            variant="body2"
            textAlign="center"
            marginBottom={1}
            color={status.startsWith("Error") ? 'error' : 'info'}
          >
            {status}
          </Typography>
          )}
          <form onSubmit={handlefoget}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Box textAlign="center" marginTop={2}>
              <Button
                type="submit"
                variant="contained"
                color="gold"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Request'}
              </Button>
            </Box>
          </form>
          
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
