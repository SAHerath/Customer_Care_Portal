import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const DashboardHome: React.FC = () => {
  return (
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
  );
};

export default DashboardHome;
