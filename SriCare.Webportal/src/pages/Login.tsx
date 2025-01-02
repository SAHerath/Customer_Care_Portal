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
import cover from "../assets/abstract.png";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await postRequest("auth/login", formData);

    if (response) {
      console.log("Login successful:", response);
      getCurrentUser();

      navigate("/dashboard");
    } else {
      console.log("Login failed");
      setError("Invalid email or password");
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
              style={{ textDecoration: "none", color: "blue" }}
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
            <Link to="/reset" style={{ textDecoration: "none", color: "blue" }}>
              Reset Password
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
