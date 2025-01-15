import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";

import { Home, Widgets, Receipt, Person, Notifications, Settings, ExpandLess, ExpandMore } from "@mui/icons-material";

import Logo from "../assets/logo.png";

const SideNav: React.FC = () => {
  const [openPlans, setOpenPlans] = useState(false);
  const [openBills, setOpenBills] = useState(false);

  const handlePlans = () => {
    setOpenPlans(!openPlans);
  };
  const handleBills = () => {
    setOpenBills(!openBills);
  };

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
            <ListItemButton onClick={handlePlans}>
              <ListItemIcon>
                <Widgets />
              </ListItemIcon>
              <ListItemText primary="Packages" />
              {openPlans ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openPlans} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton component={LinkRouter} to="/dashboard/packages/general" sx={{ pl: 6 }}>
                  <ListItemText primary="General" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={LinkRouter} to="/dashboard/packages/roaming" sx={{ pl: 6 }}>
                  <ListItemText primary="Roaming" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={handleBills}>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Bills" />
              {openBills ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openBills} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton component={LinkRouter} to="/dashboard/billing/summery" sx={{ pl: 6 }}>
                  <ListItemText primary="Summery" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={LinkRouter} to="/dashboard/billing/history" sx={{ pl: 6 }}>
                  <ListItemText primary="History" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={LinkRouter} to="/dashboard/billing/payments" sx={{ pl: 6 }}>
                  <ListItemText primary="Payments" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton component={LinkRouter} to="/dashboard/view-profile">
              <ListItemIcon>
                <Person />  
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