import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Home, Mail, Person, Notifications, Settings } from "@mui/icons-material";

import Logo from "../assets/logo.png";

const SideNav: React.FC = () => {

  return (
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

          <ListItem disablePadding>
            <ListItemButton  component={LinkRouter} to="/dashboard">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/bills">
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary="Bills" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/services">
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/dashboard/view-profile">
              <ListItemIcon>
                <Person />  
                {/* <AccountBox /> */}
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/notifications">
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/settings">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </Drawer>
  );
}

export default SideNav;