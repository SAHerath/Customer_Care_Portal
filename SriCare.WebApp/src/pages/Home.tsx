import React, { useEffect, useState } from "react";
import { Grid2, Paper, Typography } from "@mui/material";
import { getRequest } from "../services/authService";

interface Roaming {
  id: string;
  userId: string;
  activate: boolean;
  activatedPlans: object;
}

const DashboardHome: React.FC = () => {
  const [subscribedPlans, setSubscribedPlans] = useState<Roaming[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const response = await getRequest("core/roaming");
        if (response) {
  
          setSubscribedPlans(response.data.activatedPlans);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
      
    fetchData();
    setLoading(false);
  }, []);

  return (
    <Grid2 container spacing={3}>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4" color="primary">
            1,230
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Monthly Revenue</Typography>
          <Typography variant="h4" color="secondary">
            $45,000
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Active Services</Typography>
          <Typography variant="h4" color="success">
            98%
          </Typography>
        </Paper>
      </Grid2>

      {subscribedPlans.map((plan) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Subscribed Plan</Typography>
              <Typography variant="h5" color="info">
                {plan.planName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Valid: {plan.validity.split('T')[0]}
              </Typography>
            </Paper>
          </Grid2>
        ))}

    </Grid2>
  );
};

export default DashboardHome;
