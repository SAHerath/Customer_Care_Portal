import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  ThemeProvider,
} from "@mui/material";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

import { theme } from "../services/customColor";
// import Cover from "../assets/abstract.png";

interface DashboardProps {
  title: string; // Accept title as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ title }) => {

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" height="100vh">
        <SideNav />

        {/* Main Content */}
        <Box flex="1" display="flex" flexDirection="column">
          <TopNav title={title} />

          {/* Dashboard Content */}
          <Box padding={3} flex="1" sx={{
                backgroundColor: '#f8f8f8'
                // backgroundImage: `url(${Cover})`,
                // backgroundRepeat: "repeat",
                // opacity: 1,
          }}>

            <Outlet />

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
