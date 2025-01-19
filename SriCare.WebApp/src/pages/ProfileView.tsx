import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  CircularProgress,
  Badge,
} from "@mui/material";
import { VerifiedOutlined } from "@mui/icons-material";
import { getRequest } from "../services/authService";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  id: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getRequest("auth/manage/info");
        if (response) {
          setUser(response.data);
          // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setLoading(false);
  }, []);
  

  const handleEditProfile = () => {
    alert("Edit profile");
    navigate('/edit-profile');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '4rem',
        textAlign: 'center',
      }}
    >
      {user?.isEmailConfirmed ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <VerifiedOutlined
              sx={{
                fontSize: 20,
              }}
            />
          }
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#4caf50',
              color: '#fff',
              width: 25,
              height: 25,
              borderRadius: '50%',
            },
          }}
        >
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              border: '2px solid #fff',
            }}
          />
        </Badge>
      ) : (
        <Avatar
          alt={`${user?.firstName} ${user?.lastName}`}
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
          }}
        />
      )}
    
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
        {user?.email}
      </Typography>
    
      <Button variant="contained" color="primary" onClick={handleEditProfile}>
        Edit Profile
      </Button>
    </Paper>
  );
};

export default Profile;
