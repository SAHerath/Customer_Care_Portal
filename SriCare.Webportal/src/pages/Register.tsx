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
import { postRequest } from "../services/authService";
import { theme } from "../services/customColor";
import cover from "../assets/abstract.png";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await postRequest("auth/register", formData);

    if (response) {
      console.log("Register successful:", response.data);
      navigate("/login");
    } else {
      console.log("Register failed");
      setError("Invalid email or mismatch password");
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
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "repeat",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", maxWidth: "400px", width: "100%" }}
        >
          <Typography variant="h5" textAlign="center" marginBottom={3}>
            SriCare Login
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && (
              <Typography color="error" variant="body2" marginTop={1}>
                {error}
              </Typography>
            )}
            <Box textAlign="center" marginTop={3}>
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
                  "Register"
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
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              Log in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
