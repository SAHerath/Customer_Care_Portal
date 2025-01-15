import React, { useEffect, useState } from "react";
import { Typography, Paper, Avatar, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../services/authService";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  } | null>(null);
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
    navigate('/edit-profile');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '4rem  ',
        textAlign: 'center',
      }}
    >
      {
      // loading ? (
      //   <CircularProgress />
      // ) : 
      // user ? (
        <>
          {/* User Avatar */}
          <Avatar
            // alt={`${user.firstName} ${user.lastName}`}
            // src={}
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          />

          {/* User Information */}
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            {/* {user.firstName} {user.lastName} */}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
            {/* {user.email} */}
          </Typography>

          {/* Edit Profile Button */}
          <Button variant="contained" color="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </>
      // ) : (
      //   <Typography variant="body1" color="error">
      //     Failed to load user profile.
      //   </Typography>
      // )
      }
    </Paper>
  );
};

export default Profile;
