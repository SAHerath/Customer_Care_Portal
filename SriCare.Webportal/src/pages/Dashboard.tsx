import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  // ListItemButton,
  ListItemText,
} from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left" sx={{ width: 240 }}>
        <Box sx={{ width: 240, backgroundColor: '#f5f5f5', height: '100%' }}>
          <Typography variant="h6" textAlign="center" padding={2}>
            SriCare
          </Typography>
          <List>
            {/* <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton> */}

            <ListItem component={LinkRouter} to="/">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={LinkRouter} to="/bills">
              <ListItemText primary="Bills" />
            </ListItem>
            <ListItem component={LinkRouter} to="/services">
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem component={LinkRouter} to="/notifications">
              <ListItemText primary="Notifications" />
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
  );
};

export default Dashboard;
