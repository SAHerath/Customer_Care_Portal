import React, { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
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
  ThemeProvider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";

import { theme } from "../services/customColor";
import Logo from "../assets/logo.png";

const Dashboard: React.FC = () => {

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
          <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Dashboard
            </Typography>
          </Toolbar>
          </AppBar>

          {/* Dashboard Content */}
          <Box padding={3} bgcolor="#f5f5f5" flex="1">

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

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
