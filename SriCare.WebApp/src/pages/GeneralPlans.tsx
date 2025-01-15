import React, { useEffect, useState } from "react";
import { 
  Box,
  Grid2,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { getRequest, postRequest } from "../services/authService";

interface Roaming {
  id: string;
  userId: string;
  activate: boolean;
  activatedPlans: object;
}

interface Plan {
  id: string;
  planName: string;
  type: string;
  price: number;
  validity: string;
  smsQuota: number;
  callQuota: number;
  dataQuota: number;
  roamingPlans: null | string;
}

const GeneralPlans: React.FC = () => {
  const [roaming, setRoaming] = useState<Record<string, Roaming>>({});
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  
    const fetchData1 = async () => {
      try {
        const response = await getRequest("core/roaming");
        if (response) {
          setRoaming(response.data);
          // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    const fetchData2 = async (type: string) => {
      try {
        const response = await getRequest("core/plans", { Type: type });
        if (response) {

          setPlans(response.data);
          // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData1();
    fetchData2("General");
    setLoading(false);
  }, []);
  
  

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleSubscribe = async (packageId : string, packageName: string) => {
    try {
      const response = await postRequest(`core/roaming/${roaming.id}/activate-package/${packageId}`);
      if (response) {
        alert(`Subscribed to ${packageName}`)
        console.log('Subscribed!', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <Grid2 container spacing={3}>
      {plans?.map((plan) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
          <Paper
            sx={{
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" color="#db2d43" gutterBottom>
              {plan.planName}
            </Typography>
            <Divider />
            <Typography variant="body2" marginTop={2}>
              <strong>Type:</strong> {plan.type}
            </Typography>
            <Typography variant="body2">
              <strong>Price:</strong> ${plan.price.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>Validity:</strong>{' '}
              {new Date(plan.validity).toLocaleDateString()}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body2">
              <strong>SMS Quota:</strong> {plan.smsQuota}
            </Typography>
            <Typography variant="body2">
              <strong>Call Quota:</strong> {plan.callQuota} minutes
            </Typography>
            <Typography variant="body2">
              <strong>Data Quota:</strong> {plan.dataQuota} MB
            </Typography>

            <Button
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: "#9F774E", }}
              fullWidth
              onClick={() => handleSubscribe(plan.id, plan.planName)}
            >
              Subscribe
            </Button>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GeneralPlans;
