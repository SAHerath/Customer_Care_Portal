import React, { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";
import {
  Box,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";

import { theme } from "../services/customColor";
import Logo from "../assets/logo.png";
// import Cover from "../assets/abstract.png";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Drawer variant="permanent" anchor="left" sx={{ width: 240 }}>
          <Box sx={{ width: 240, height: '100%' }}>
            <Box textAlign="center" sx={{height: '64px'}}>
              <img src={Logo} alt="Logo" style={{
                  width: '200px',
                  objectFit: 'contain',
                  padding: '10px',
                }}
              />
            </Box>
            <Divider />

            <List>

              <ListItem disablePadding component={LinkRouter} to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding component={LinkRouter} to="/bills">
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bills" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding component={LinkRouter} to="/services">
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Services" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding component={LinkRouter} to="/notifications">
                <ListItemButton>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItemButton>
              </ListItem>

            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box flex="1" display="flex" flexDirection="column">
          {/* Navbar */}
          <AppBar position="sticky" sx={{ backgroundColor: '#9F774E' }}>
            <Toolbar>
              <Typography
                variant="h6" noWrap component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Dashboard
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  // aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
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
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

              </Box>


            </Toolbar>
          </AppBar>

          {/* Dashboard Content */}
          <Box padding={3} flex="1" sx={{
                backgroundColor: '#f8f8f8'
                // backgroundImage: `url(${Cover})`,
                // backgroundRepeat: "repeat",
                // opacity: 1,
          }}>

            <Grid container spacing={3}>
              {/* Widget 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4" color="primary">
                    1,230
                  </Typography>
                </Paper>
              </Grid>

              {/* Widget 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Monthly Revenue</Typography>
                  <Typography variant="h4" color="secondary">
                    $45,000
                  </Typography>
                </Paper>
              </Grid>

              {/* Widget 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Active Services</Typography>
                  <Typography variant="h4" color="success">
                    98%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          
            <Typography sx={{ marginBottom: 6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
              enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
              imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
              Convallis convallis tellus id interdum velit laoreet id donec ultrices.
              Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
              nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
              feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
            <Typography sx={{ marginBottom: 6 }}>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
              tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
              sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
              tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
            <Typography sx={{ marginBottom: 6 }}>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
              tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
              sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
              tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
