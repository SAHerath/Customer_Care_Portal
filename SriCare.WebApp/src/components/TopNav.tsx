import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Mail, Notifications} from "@mui/icons-material";

interface TopNavProps {
  title: string; // Accept title as a prop
}

const TopNav: React.FC<TopNavProps> = ({ title }) => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate('/dashboard/view-profile');
    handleMenuClose();
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  /*
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    // eslint-disable no-bitwise 
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    // eslint-enable no-bitwise
  
    return color;
  }
  */
  
  function stringAvatar(name: string) {
    const avatar = name.toUpperCase()
    return {
      sx: {
        color: 'black',
        bgcolor: '#f8f8f8',
      },
      children: `${avatar.split(' ')[0][0]}${avatar.split(' ')[1][0]}`,
    };
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#9F774E' }}>
      <Toolbar>
        <Typography
          variant="h6" noWrap component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={1} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="medium"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            sx={{padding: '1rem'}}
          >
            <Avatar {...stringAvatar(getCurrentUser())} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{marginTop: '0.5rem', marginLeft: '0.6rem',}}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

        </Box>


      </Toolbar>
    </AppBar>
  );
}

export default TopNav;