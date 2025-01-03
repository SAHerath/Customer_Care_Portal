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
import { Link, useNavigate } from "react-router-dom";
import { postRequest, getCurrentUser } from "../services/authService";
import { theme } from "../services/customColor";
import Logo from "../assets/logo.png";
import Cover from "../assets/abstract.png";


type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const response = await postRequest("auth/login", formData);

    if (response) {
      console.log("Login successful:", response);
      getCurrentUser();
      navigate("/dashboard");
    } else {
      console.log("Login failed");
      setStatus("Error: Invalid email or password");
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
          backgroundImage: `url(${Cover})`,
          backgroundRepeat: "repeat",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", maxWidth: "400px", width: "100%" }}
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
            Login
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
          <form onSubmit={handleLogin}>
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
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
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
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </form>

          <Typography
            color="textSecondary"
            textAlign="center"
            variant="body2"
            marginTop={2}
          >
            New user?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "info" }}
            >
              Register
            </Link>
          </Typography>
          <Typography
            color="textSecondary"
            textAlign="center"
            variant="body2"
            marginTop={2}
          >
            Forgot password?{" "}
            <Link to="/forgot-password" style={{ textDecoration: "none", color: "info" }}>
              Reset Password
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
