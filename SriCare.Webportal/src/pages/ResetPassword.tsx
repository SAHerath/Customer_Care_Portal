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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postRequest } from "../services/authService";
import { theme } from "../services/customColor";
import Logo from "../assets/logo.png";
import Cover from "../assets/abstract.png";

type FormData = {
  resetCode: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    resetCode: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);

  const appCode = searchParams.get('code');

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!appCode) {
      setStatus("Error: No reset code found!");
      return;
    }

    if(formData.newPassword !== formData.confirmPassword) {
      setStatus("Error: Password missmatch.");
      return;
    }

    setLoading(true);

    formData.resetCode = appCode;

    const response = await postRequest("auth/resetPassword", formData);

    if (response) {
      console.log("Reset successful:", response.data);
      alert("Password has been reset successfully!");
      navigate("/login");
    } else {
      console.log("Register failed");
      setStatus("Error: Unable to reset password. Please try again later.");
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
            Reset Password
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
          <form onSubmit={handleReset}>
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
              label="New Password"
              variant="outlined"
              margin="normal"
              type="password"
              name="newPassword"
              value={formData.newPassword}
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
                  "Reset"
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
            Back to login?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "info" }}>
              Log in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPassword;
