
import React, { useEffect, useState } from "react";
import { 
Grid2,
Paper,
Typography,
Avatar,
Button,
} from "@mui/material";
import { ContactPhone, AccountBalance, AttachMoney, LocalPhone, DataUsage, Assignment, Info } from "@mui/icons-material";
import { getRequest } from "../services/authService";

interface Roaming {
  id: string;
  userId: string;
  activate: boolean;
  activatedPlans: { planName: string; validity: string; callQuota?: number }[];
}
interface CurrentBill {
  userId: string;
  billId: string;
  amount: number;
  dueDate: string;
  status: string;
}
interface UserSummary {
  phoneNumber: string;
  totalCalls: number;
  totalSms: number;
  totalData: number;
  activatedDataPackages: { name: string; usage: string; details?: string }[];
}

const DashboardHome: React.FC = () => {
  const [subscribedPlans, setSubscribedPlans] = useState<Roaming["activatedPlans"]>([]);
  const [currentBill, setCurrentBill] = useState<CurrentBill | null>(null);
  const [userSummary, setUserSummary] = useState<UserSummary | null>(null);
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

    const fetchCurrentBill = async () => {
      try {
        const response = await getRequest("billing/current-bill");
        if (response) {
          setCurrentBill(response.data);
        }
      } catch (error) {
        console.error('Error fetching current bill:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    fetchCurrentBill();
    setUserSummary({
      phoneNumber: '+94 712 345 678',
      totalCalls: 6300,
      totalSms: 26,
      totalData: 2500,
      activatedDataPackages: [
        { name: 'Data Package 1', usage: '2GB of 5GB used', details: 'High-speed internet valid for 30 days' },
        { name: 'Data Package 2', usage: '500MB of 2GB used', details: 'Bonus data valid for 15 days' },
      ],
    });
    setLoading(false);
  }, []);

  return (
    <Grid2 container spacing={3}>

      <Grid2 size={{ xs: 12 }}>
        <Paper elevation={3} sx={{ display: 'flex', alignItems:'center', justifyContent:'space-evenly', padding: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <ContactPhone fontSize="large" />
          </Avatar>
          <Typography variant="h4" color="info.main">
            {userSummary?.phoneNumber}
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Avatar sx={{ margin: '0 auto', bgcolor: 'info.main', width: 56, height: 56 }}>
            <DataUsage fontSize="large" />
          </Avatar>
          <Typography variant="h6" marginTop={2}>{userSummary?.activatedDataPackages[0]?.name || "N/A"}</Typography>
          <Typography variant="body1" color="success.main">{userSummary?.activatedDataPackages[0]?.usage || "No Data"}</Typography>
          <Typography variant="body1" color="textSecondary">
            {userSummary?.activatedDataPackages[0]?.details || "Details not available"}
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Avatar sx={{ margin: '0 auto', bgcolor: 'info.main', width: 56, height: 56 }}>
            <DataUsage fontSize="large" />
          </Avatar>
          <Typography variant="h6" marginTop={2}>{userSummary?.activatedDataPackages[1]?.name || "N/A"}</Typography>
          <Typography variant="body1" color="success.main">{userSummary?.activatedDataPackages[1]?.usage || "No Data"}</Typography>
          <Typography variant="body1" color="textSecondary">
            {userSummary?.activatedDataPackages[1]?.details || "Details not available"}
          </Typography>
        </Paper>
      </Grid2>

      {subscribedPlans.map((plan, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Avatar sx={{ margin: '0 auto', bgcolor: 'warning.main', width: 56, height: 56 }}>
              <Assignment fontSize="large" />
            </Avatar>
            <Typography variant="h6" marginTop={2}>{plan?.planName || "Unknown Plan"}</Typography>
            <Typography variant="body1" color="success.main">
              Minutes Left: {plan?.callQuota}
            </Typography>
            <Typography variant="body1" color="textSecondary" >
              Valid Until: {new Date(plan?.validity).toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid2>
      ))}

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Avatar sx={{ margin: '0 auto', bgcolor: 'error.main', width: 56, height: 56 }}>
            <AttachMoney fontSize="large" />
          </Avatar>
          <Typography variant="h6" marginTop={2}>Current Bill</Typography>
          <Typography
            variant="body1"
            color={currentBill?.dueDate && new Date(currentBill.dueDate) < new Date() ? 'error.main' : 'textSecondary'}
          >
            Amount: Rs.{currentBill?.amount.toFixed(2) || 0}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Due Date: {currentBill?.dueDate && new Date(currentBill.dueDate).toLocaleDateString() || "N/A"}
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, }}>
        <Paper elevation={3} sx={{ display: 'flex', alignItems:'center', justifyContent:'space-evenly', padding: 2 }}>
          <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, marginRight: 1 }}>
            <Info fontSize="large" />
          </Avatar>
          <Typography variant="h5" color="info.main">Account Summary</Typography>
          <Typography variant="body1">Total Calls: {userSummary?.totalCalls || 0} min</Typography>
          <Typography variant="body1">Total SMS: {userSummary?.totalSms || 0}</Typography>
          <Typography variant="body1">Total Data: {userSummary?.totalData || 0} MB</Typography>
        </Paper>
      </Grid2>

    </Grid2>
  );
};

export default DashboardHome;
